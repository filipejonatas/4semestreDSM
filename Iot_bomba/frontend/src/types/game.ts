export interface User {
  id: number;
  name: string;
  created_at: string;
}

export interface Question {
  id: number;
  topic: string;
  question: string;
  correct_answer: string;
  wrong_answers: string[];
}

export interface GameSession {
  id: string;
  user_id: number;
  topic: string;
  status: 'waiting' | 'active' | 'completed' | 'failed';
  score: number;
  start_time?: string;
  end_time?: string;
  time_taken?: number;
  currentQuestion?: Question;
  questionNumber?: number;
  timeRemaining?: number;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  time: number;
  topic: string;
  date: string;
}

export interface GameAnswer {
  correct: boolean;
  score: number;
  nextQuestion?: Question;
  gameComplete?: boolean;
}

export interface BombStatus {
  shouldTrigger: boolean;
  countdown: number;
  status: 'idle' | 'armed' | 'exploded' | 'defused';
}