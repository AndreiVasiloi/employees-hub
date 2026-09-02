import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { getDatabaseConfig } from './database.config.js';

export const databaseProvider: Provider = {
  provide: DataSource,
  useFactory: () =>
    new DataSource({
      ...getDatabaseConfig(),
      synchronize: false,
      migrationsRun: false,
      migrations: ['dist/database/migrations/*{.js,.ts}'],
    }),
};
