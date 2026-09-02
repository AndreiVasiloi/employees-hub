import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { databaseProvider } from './database/database.provider.js';
import { HealthController } from './health/health.controller.js';

@Module({
  imports: [],
  controllers: [AppController, HealthController],
  providers: [AppService, databaseProvider],
})
export class AppModule {}
