import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bombaIOT',
  password: 'jonatas',
  port: 5432,
});

const createTable = `
CREATE TABLE IF NOT EXISTS evento_bomba (
  id SERIAL PRIMARY KEY,
  status VARCHAR(50) NOT NULL,
  data_acao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

async function migrate() {
  try {
    await pool.query(createTable);
    console.log('✅ Migration executada com sucesso!');
  } catch (err) {
    console.error('❌ Erro na migration:', err);
  } finally {
    await pool.end();
  }
}

migrate();