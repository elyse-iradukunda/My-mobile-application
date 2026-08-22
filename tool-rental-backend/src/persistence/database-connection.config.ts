import { DataSource, DataSourceOptions } from 'typeorm';
import { Tool } from '@persistence/tools/tool.entity';

// Check environment
const isProduction = process.env.NODE_ENV === 'production';

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'tool_rental',
  entities: [Tool],
  synchronize: false, // NEVER use synchronize in production!
  logging: isProduction ? false : ['error', 'warn'], // Only log errors in production
  migrations: ['src/persistence/migrations/*.ts'],
  migrationsTableName: 'migrations',
  // Add these for production safety
  ssl: isProduction ? { rejectUnauthorized: false } : false,
  extra: {
    max: 20, // Connection pool limit
    idleTimeoutMillis: 30000,
  },
};

export const AppDataSource = new DataSource(databaseConfig);

export default databaseConfig;
