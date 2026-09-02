import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { DataSource } from 'typeorm';
import { describe, expect, it } from 'vitest';
import { HealthController } from '../src/health/health.controller.js';

describe('health and database integration', () => {
  it('reaches disposable PostgreSQL for readiness', async () => {
    const container: StartedPostgreSqlContainer = await new PostgreSqlContainer(
      'postgres:18.6-alpine',
    ).start();
    const dataSource = new DataSource({
      type: 'postgres',
      host: container.getHost(),
      port: container.getPort(),
      username: container.getUsername(),
      password: container.getPassword(),
      database: container.getDatabase(),
      synchronize: false,
    });
    await dataSource.initialize();

    const moduleFixture = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [{ provide: DataSource, useValue: dataSource }],
    }).compile();
    const app: INestApplication = moduleFixture.createNestApplication();
    await app.init();

    await request(app.getHttpServer()).get('/health/ready').expect(200).expect({ status: 'ok' });

    await app.close();
    await dataSource.destroy();
    await container.stop();
  }, 60_000);

  it('keeps TypeORM synchronization disabled without business schema', () => {
    expect.fail('Test skeleton: migration configuration is not implemented yet');
  });
});
