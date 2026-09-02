import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';

export const databaseProvider: Provider = {
  provide: DataSource,
  useFactory: () =>
    new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER ?? 'employee_hub',
      password: process.env.DB_PASSWORD ?? 'employee_hub_local',
      database: process.env.DB_NAME ?? 'employee_hub',
      synchronize: false,
      migrationsRun: false,
      migrations: ['dist/database/migrations/*{.js,.ts}'],
    }),
};
