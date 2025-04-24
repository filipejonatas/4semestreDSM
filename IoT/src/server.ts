import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';
import { WebSocketServer } from 'ws';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const httpServer = createServer(app);

// Cria o servidor WebSocket puro
const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', (ws) => {
  console.log('ESP32 conectado via WebSocket!');

  ws.on('message', (message) => {
    console.log('Mensagem recebida do ESP32:', message.toString());

  });

  ws.send('Conexão estabelecida com o servidor!');
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});