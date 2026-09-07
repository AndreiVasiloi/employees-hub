import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AccessController } from './access/access.controller.js';
import { databaseProvider } from './database/database.provider.js';
import { HealthController } from './health/health.controller.js';
import { EmployeesController } from './workforce/employees/employees.controller.js';
import { EmployeesService } from './workforce/employees/employees.service.js';
import { TeamsController } from './workforce/teams/teams.controller.js';
import { TeamsService } from './workforce/teams/teams.service.js';

@Module({
  imports: [],
  controllers: [
    AppController,
    AccessController,
    HealthController,
    TeamsController,
    EmployeesController,
  ],
  providers: [AppService, databaseProvider, TeamsService, EmployeesService],
})
export class AppModule {}
