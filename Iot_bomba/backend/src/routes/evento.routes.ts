import { Router } from 'express';
import { criarEvento, listarEventos } from '../controllers/eventoController';

const router = Router();

router.post('/', criarEvento);
router.get('/', listarEventos);

export default router;
