import { Router } from 'express';
import {
  registerGame,
  getGameStatus,
  startGame,
  answerQuestion,
  completeGame
} from '../controllers/gameController';

const router = Router();

router.post('/register', registerGame);
router.get('/:sessionId', getGameStatus);
router.post('/:sessionId/start', startGame);
router.post('/:sessionId/answer', answerQuestion);
router.post('/:sessionId/complete', completeGame);

export default router;
