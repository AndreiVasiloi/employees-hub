import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { vi } from 'vitest';
import { DataSource } from 'typeorm';
import { AppModule } from '../app.module';
import { HealthController } from './health.controller';

describe('health API', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns 200 for live without a database', async () => {
    await request(app.getHttpServer())
      .get('/health/live')
      .expect(200)
      .expect({ status: 'ok' });
  });

  it('returns 200 for ready when the database query succeeds', async () => {
    const dataSource = {
      isInitialized: true,
      query: vi.fn().mockResolvedValue([{ '?column?': 1 }]),
    };
    const controller = new HealthController(dataSource as unknown as DataSource);

    await expect(controller.getReady()).resolves.toEqual({ status: 'ok' });
    expect(dataSource.query).toHaveBeenCalledWith('SELECT 1');
  });

  it('returns 503 for ready when the database query fails', async () => {
    const dataSource = {
      isInitialized: true,
      query: vi.fn().mockRejectedValue(new Error('database unavailable')),
    };
    const controller = new HealthController(dataSource as unknown as DataSource);

    await expect(controller.getReady()).rejects.toMatchObject({
      status: 503,
    });
  });

  it('excludes sensitive configuration from health responses', () => {
    expect.fail('Test skeleton: safe health responses are not implemented yet');
  });

  it('rejects invalid database settings without logging secrets', () => {
    expect.fail('Test skeleton: configuration validation is not implemented yet');
  });
});
