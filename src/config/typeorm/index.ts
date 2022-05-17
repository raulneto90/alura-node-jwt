import 'dotenv/config';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'alura-node-jwt.sql',
  migrations: ['./src/database/migrations/*.ts'],
});
