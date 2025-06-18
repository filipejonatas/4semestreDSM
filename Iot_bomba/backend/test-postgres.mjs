import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'bobomb',
  password: 'jorge123',
  port: 5432,
});

client.connect()
  .then(() => {
    console.log('Conectado com sucesso ao PostgreSQL');
    return client.end();
  })
  .catch((err) => {
    console.error('Erro na conexão:', err.message);
  });
