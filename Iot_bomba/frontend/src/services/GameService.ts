import { gameApi } from './api';
import { GameSession } from '../types/game';

export class GameService {
  private static pollingInterval: NodeJS.Timeout | null = null;

  // Start polling for game status updates
  static startPolling(sessionId: string, callback: (session: GameSession) => void, interval: number = 2000) {
    this.stopPolling(); // Clear any existing polling

    this.pollingInterval = setInterval(async () => {
      try {
        const session = await gameApi.getGameStatus(sessionId);
        callback(session);
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, interval);
  }

  // Stop polling
  static stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

  // Format time remaining for display
  static formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  // Shuffle array (for randomizing answer options)
  static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Get all answer options (correct + wrong answers shuffled)
  static getAnswerOptions(correctAnswer: string, wrongAnswers: string[]): string[] {
    const allAnswers = [correctAnswer, ...wrongAnswers];
    return this.shuffleArray(allAnswers);
  }
}