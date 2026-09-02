export interface DatabaseConfig {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export function getDatabaseConfig(
  env: Record<string, string | undefined> = process.env,
): DatabaseConfig {
  const port = Number(env.DB_PORT ?? 5432);
  const config: DatabaseConfig = {
    type: 'postgres',
    host: env.DB_HOST ?? 'localhost',
    port,
    username: env.DB_USER ?? 'employee_hub',
    password: env.DB_PASSWORD ?? 'employee_hub_local',
    database: env.DB_NAME ?? 'employee_hub',
  };

  if (
    !config.host ||
    !Number.isInteger(config.port) ||
    config.port < 1 ||
    config.port > 65535 ||
    !config.username ||
    !config.password ||
    !config.database
  ) {
    throw new Error('Invalid database configuration');
  }

  return config;
}
