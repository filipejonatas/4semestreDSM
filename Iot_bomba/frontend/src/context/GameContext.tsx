import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { GameSession, Question } from '../types/game';
import { GameService } from '../services/GameService'

interface GameState {
  session: GameSession | null;
  loading: boolean;
  error: string | null;
  currentQuestion: Question | null;
  timeRemaining: number;
  isPolling: boolean;
}

type GameAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SESSION'; payload: GameSession }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_CURRENT_QUESTION'; payload: Question | null }
  | { type: 'SET_TIME_REMAINING'; payload: number }
  | { type: 'START_POLLING' }
  | { type: 'STOP_POLLING' }
  | { type: 'UPDATE_SCORE'; payload: number }
  | { type: 'RESET_GAME' };

const initialState: GameState = {
  session: null,
  loading: false,
  error: null,
  currentQuestion: null,
  timeRemaining: 120, // 2 minutes default
  isPolling: false,
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_SESSION':
      return { 
        ...state, 
        session: action.payload, 
        loading: false, 
        error: null,
        currentQuestion: action.payload.currentQuestion || null,
        timeRemaining: action.payload.timeRemaining || 120
      };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    case 'SET_CURRENT_QUESTION':
      return { ...state, currentQuestion: action.payload };
    
    case 'SET_TIME_REMAINING':
      return { ...state, timeRemaining: action.payload };
    
    case 'START_POLLING':
      return { ...state, isPolling: true };
    
    case 'STOP_POLLING':
      return { ...state, isPolling: false };
    
    case 'UPDATE_SCORE':
      return { 
        ...state, 
        session: state.session ? { ...state.session, score: action.payload } : null 
      };
    
    case 'RESET_GAME':
      return initialState;
    
    default:
      return state;
  }
};

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  startPolling: (sessionId: string) => void;
  stopPolling: () => void;
  formatTime: (seconds: number) => string;
}

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const startPolling = (sessionId: string) => {
    dispatch({ type: 'START_POLLING' });
    GameService.startPolling(sessionId, (session) => {
      dispatch({ type: 'SET_SESSION', payload: session });
    });
  };

  const stopPolling = () => {
    dispatch({ type: 'STOP_POLLING' });
    GameService.stopPolling();
  };

  const formatTime = (seconds: number): string => {
    return GameService.formatTime(seconds);
  };

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      GameService.stopPolling();
    };
  }, []);

  // Auto-countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (state.session?.status === 'active' && state.timeRemaining > 0) {
      interval = setInterval(() => {
        dispatch({ type: 'SET_TIME_REMAINING', payload: state.timeRemaining - 1 });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.session?.status, state.timeRemaining]);

  const contextValue: GameContextType = {
    state,
    dispatch,
    startPolling,
    stopPolling,
    formatTime,
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};