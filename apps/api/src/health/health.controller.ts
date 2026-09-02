import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Controller('health')
export class HealthController {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  @Get('ready')
  async getReady(): Promise<{ status: 'ok' }> {
    try {
      if (!this.dataSource.isInitialized) {
        await this.dataSource.initialize();
      }

      await this.dataSource.query('SELECT 1');
      return { status: 'ok' };
    } catch {
      throw new ServiceUnavailableException();
    }
  }
}
