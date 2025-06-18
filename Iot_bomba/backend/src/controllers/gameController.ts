import { Request, Response } from 'express';
import GameService from '../services/GameService';

export const registerGame = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, topic } = req.body;
    if (!name || !topic) {
      res.status(400).json({ error: 'Name and topic are required.' });
      return;
    }
    const result = await GameService.registerGame(name, topic);
    res.status(201).json(result);
  } catch (err) {
    console.error('Error in registerGame:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getGameStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req.params;
    const status = await GameService.getGameStatus(Number(sessionId));
    if (!status) {
      res.status(404).json({ error: 'Game session not found' });
      return;
    }
    res.json(status);
  } catch (err) {
    console.error('Error in getGameStatus:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const startGame = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req.params;
    const { trigger } = req.body;
    if (trigger !== 'PIR_DETECTED') {
      res.status(400).json({ error: 'Invalid trigger' });
      return;
    }
    const result = await GameService.startGame(Number(sessionId));
    res.json(result);
  } catch (err) {
    console.error('Error in startGame:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const answerQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req.params;
    const { questionId, answer } = req.body;
    if (!questionId || !answer) {
      res.status(400).json({ error: 'questionId and answer required' });
      return;
    }
    const result = await GameService.answerQuestion(Number(sessionId), questionId, answer);
    res.json(result);
  } catch (err) {
    console.error('Error in answerQuestion:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const completeGame = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req.params;
    const { result } = req.body; // 'success'|'timeout'|'failed'
    if (!['success', 'timeout', 'failed'].includes(result)) {
      res.status(400).json({ error: 'Invalid result' });
      return;
    }
    const finalResult = await GameService.completeGame(Number(sessionId), result);
    res.json(finalResult);
  } catch (err) {
    console.error('Error in completeGame:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};