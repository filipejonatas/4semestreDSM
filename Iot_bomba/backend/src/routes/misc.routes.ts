import { Router } from 'express';
import { getLeaderboard, getBombStatus, postBombTrigger } from '../controllers/miscController';

const router = Router();

router.get('/leaderboard', getLeaderboard);
router.get('/bomb/status', getBombStatus);
router.post('/bomb/trigger', postBombTrigger);

export default router;
