import { Pool } from 'pg';

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bombaIOT',
    password: '*******',
    port: 5432,
  });