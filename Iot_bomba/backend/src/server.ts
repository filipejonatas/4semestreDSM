import express, { Request, Response } from 'express';
import cors from 'cors';
import { pool } from './connection';

const app = express();
app.use(cors());
app.use(express.json());

interface EventoBomba {
  id: number;
  status: string;
  data_acao: string;
}

app.post('/evento', async (req: Request, res: Response) => {
  const { status, data_acao } = req.body;

  if (!status) {
    res.status(400).json({ error: 'Status é obrigatório.' });
  }

  try {
    const result = await pool.query<EventoBomba>(
      'INSERT INTO evento_bomba (status, data_acao) VALUES ($1, $2) RETURNING *',
      [status, data_acao ? new Date(data_acao) : new Date()]
    );
    res.status(201).json(result.rows[0]);
    console.log("bomba acionada")
  } catch (err) {
    console.error('Erro ao salvar evento:', err);
    res.status(500).json({ error: 'Erro ao salvar evento.' });
  }
});

app.get('/evento', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query<EventoBomba>('SELECT * FROM evento_bomba ORDER BY data_acao DESC');
    res.json(result.rows);
    
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar eventos.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(3001, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});