import express from 'express';
import cors from 'cors';

import eventoRoutes from './routes/evento.routes';
import gameRoutes from './routes/game.routes';
import miscRoutes from './routes/misc.routes';

const app = express();
app.use(cors());
app.use(express.json());

// Use prefixo para as rotas
app.use('/evento', eventoRoutes);
app.use('/game', gameRoutes);
app.use('/misc', miscRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});
