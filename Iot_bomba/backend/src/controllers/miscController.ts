import { Request, Response } from 'express';
import MiscService from '../services/MiscService';

export const getLeaderboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { topic, limit } = req.query;
    const limitNum = limit ? Number(limit) : 10;

    if (topic && typeof topic !== 'string') {
      res.status(400).json({ error: 'Topic must be a string' });
    }
    if (isNaN(limitNum) || limitNum < 1) {
      res.status(400).json({ error: 'Limit must be a positive number' });
    }

    const rankings = await MiscService.getLeaderboard(topic as string | undefined, limitNum);
    res.json({ rankings });
  } catch (err) {
    console.error('Error in getLeaderboard:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBombStatus = async (_req: Request, res: Response) => {
  try {
    const status = await MiscService.getBombStatus();
    res.json(status);
  } catch (err) {
    console.error('Error in getBombStatus:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const postBombTrigger = async (req: Request, res: Response): Promise<void> => {
  try {
    const { event } = req.body;
    const allowedEvents = ['PIR_DETECTED', 'GAME_FAILED', 'GAME_SUCCESS'];
    if (!allowedEvents.includes(event)) {
      res.status(400).json({ error: 'Invalid event' });
    }
    const result = await MiscService.postBombTrigger(event);
    res.json(result);
  } catch (err) {
    console.error('Error in postBombTrigger:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
