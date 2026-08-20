import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { DatabaseConnectionInterface } from './database-connection.interface';

@Injectable()
export class DatabaseConnection implements DatabaseConnectionInterface {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DB || 'tool_rental',
    });
  }

  async query<T = any>(text: string, params?: any[]): Promise<T[]> {
    const result = await this.pool.query(text, params);
    return result.rows;
  }

  async getClient() {
    return this.pool.connect();
  }
}
