import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { gameApi } from '../services/api';
import Timer from '../components/Timer';
import QuestionCard from '../components/QuestionCard';
import GameStatus from '../components/GameStatus';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const GamePage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { state, dispatch, startPolling, stopPolling } = useGame();
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      navigate('/');
      return;
    }

    loadGameState();
    startPolling(sessionId);

    return () => {
      stopPolling();
    };
  }, [sessionId]);

  const loadGameState = async () => {
    if (!sessionId) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const session = await gameApi.getGameStatus(sessionId);
      dispatch({ type: 'SET_SESSION', payload: session });
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load game state' });
    }
  };

  const handleAnswerSubmit = async () => {
    if (!sessionId || !state.currentQuestion || !selectedAnswer || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const result = await gameApi.submitAnswer(sessionId, state.currentQuestion.id, selectedAnswer);
      
      dispatch({ type: 'UPDATE_SCORE', payload: result.score });
      
      if (result.gameComplete) {
        await gameApi.completeGame(sessionId, 'success');
        navigate(`/results/${sessionId}`);
      } else if (result.nextQuestion) {
        dispatch({ type: 'SET_CURRENT_QUESTION', payload: result.nextQuestion });
        setSelectedAnswer('');
      }
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to submit answer' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTimeExpired = async () => {
    if (!sessionId) return;
    
    try {
      await gameApi.completeGame(sessionId, 'timeout');
      navigate(`/results/${sessionId}`);
    } catch (error) {
      console.error('Failed to handle timeout:', error);
    }
  };

  if (state.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black flex items-center justify-center">
        <LoadingSpinner text="Loading game..." size="large" />
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black flex items-center justify-center p-4">
        <div className="bg-black/80 p-8 rounded-lg border border-red-500/30 text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <ErrorMessage message={state.error} />
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-red-500 mb-2">💣 B-O-BOMB</h1>
          <GameStatus session={state.session} />
        </div>

        <Timer
          timeRemaining={state.timeRemaining}
          isActive={state.session?.status === 'active'}
          onTimeExpired={handleTimeExpired}
        />

        {state.session?.status === 'waiting' && (
          <div className="bg-black/80 p-8 rounded-lg border border-yellow-500/30 text-center">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">⏳ Waiting for PIR Sensor</h2>
            <p className="text-white mb-4">Move near the bomb to start the countdown!</p>
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full mx-auto mb-4"></div>
              <p className="text-yellow-400">Detecting movement...</p>
            </div>
          </div>
        )}

        {state.session?.status === 'active' && state.currentQuestion && (
          <QuestionCard
            question={state.currentQuestion}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={setSelectedAnswer}
            onSubmit={handleAnswerSubmit}
            isSubmitting={isSubmitting}
            questionNumber={state.session.questionNumber || 1}
            totalQuestions={5}
          />
        )}
      </div>
    </div>
  );
};

export default GamePage;