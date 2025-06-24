export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface RegisterResponse {
  sessionId: string;
  gameState: string;
}

export interface GameCompleteResponse {
  finalScore: number;
  leaderboardPosition: number;
}

export interface LeaderboardResponse {
  rankings: Array<{
    name: string;
    score: number;
    time: number;
      topic: string;
      date: string;
    }>;
  }