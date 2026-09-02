import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { getDatabaseConfig } from './database.config.js';

export function createDataSource(): DataSource {
  return new DataSource({
    ...getDatabaseConfig(),
    synchronize: false,
    migrationsRun: false,
    migrations: ['dist/database/migrations/*{.js,.ts}'],
  });
}

export const databaseProvider: Provider = {
  provide: DataSource,
  useFactory: createDataSource,
};
