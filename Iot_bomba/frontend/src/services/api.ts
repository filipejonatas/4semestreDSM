import axios from 'axios';
import { GameSession, LeaderboardEntry, GameAnswer } from '../types/game';
import { RegisterResponse, GameCompleteResponse, LeaderboardResponse } from '../types/api';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const gameApi = {
  // Register new game
  register: async (name: string, topic: string): Promise<RegisterResponse> => {
    const response = await api.post('/game/register', { name, topic });
    return response.data;
  },

  // Get game status
  getGameStatus: async (sessionId: string): Promise<GameSession> => {
    const response = await api.get(`/game/${sessionId}`);
    return response.data;
  },

  // Start game (triggered by PIR)
  startGame: async (sessionId: string): Promise<GameSession> => {
    const response = await api.post(`/game/${sessionId}/start`, { trigger: 'PIR_DETECTED' });
    return response.data;
  },

  // Submit answer
  submitAnswer: async (sessionId: string, questionId: number, answer: string): Promise<GameAnswer> => {
    const response = await api.post(`/game/${sessionId}/answer`, { questionId, answer });
    return response.data;
  },

  // Complete game
  completeGame: async (sessionId: string, result: 'success' | 'timeout' | 'failed'): Promise<GameCompleteResponse> => {
    const response = await api.post(`/game/${sessionId}/complete`, { result });
    return response.data;
  },

  // Get leaderboard
  getLeaderboard: async (topic?: string, limit: number = 10): Promise<LeaderboardResponse> => {
    const params: any = { limit };
    if (topic) params.topic = topic;
    
    const response = await api.get('/leaderboard', { params });
    return response.data;
  },
};

export const bombApi = {
  // Get bomb status (for ESP32 polling)
  getBombStatus: async () => {
    const response = await api.get('/bomb/status');
    return response.data;
  },

  // Trigger bomb event
  triggerBomb: async (event: 'PIR_DETECTED' | 'GAME_FAILED' | 'GAME_SUCCESS') => {
    const response = await api.post('/bomb/trigger', { event });
    return response.data;
  },
};

export default api;