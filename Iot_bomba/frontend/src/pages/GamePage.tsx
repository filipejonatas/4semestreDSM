import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGame } from '../context/GameContext';
import { gameApi } from '../services/api';
import GameTimer from '../components/GameTimer';
import QuestionCard from '../components/QuestionCard';
import GameWaiting from '../components/GameWaiting';

const Bg = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #000 100%);
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Padding = styled.div`
  padding: 16px;
`;

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #ef4444;
  margin-bottom: 8px;
`;

const StatusText = styled.div`
  color: #fff;
  margin-top: 8px;
  font-size: 1.1rem;
`;

const ErrorBox = styled.div`
  background: rgba(0,0,0,0.8);
  padding: 32px;
  border-radius: 12px;
  border: 1px solid rgba(239,68,68,0.3);
  text-align: center;
`;

const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ef4444;
  margin-bottom: 16px;
`;

const Btn = styled.button`
  margin-top: 16px;
  background: #dc2626;
  color: #fff;
  font-weight: bold;
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #b91c1c;
  }
`;

const LoadingText = styled.div`
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
`;

const GamePage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { state, dispatch, startPolling, stopPolling } = useGame();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      navigate('/');
      return;
    }
    loadGameState();
    startPolling(sessionId);
    return () => stopPolling();
    // eslint-disable-next-line
  }, [sessionId]);

  const loadGameState = async () => {
    if (!sessionId) return;
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const session = await gameApi.getGameStatus(sessionId);
      dispatch({ type: 'SET_SESSION', payload: session });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load game state' });
    }
  };

  const handleAnswer = async (answer: string) => {
    if (!sessionId || !state.currentQuestion || !answer || isSubmitting) return;
    try {
      setIsSubmitting(true);
      const result = await gameApi.submitAnswer(sessionId, state.currentQuestion.id, answer);
      dispatch({ type: 'UPDATE_SCORE', payload: result.score });
      if (result.gameComplete) {
        await gameApi.completeGame(sessionId, 'success');
        navigate(`/results/${sessionId}`);
      } else if (result.nextQuestion) {
        dispatch({ type: 'SET_CURRENT_QUESTION', payload: result.nextQuestion });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to submit answer' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // If you want to handle time expiration, you can add logic here or in the parent.
  // For now, just show the timer.
  
  if (state.loading) {
    return (
      <Bg as={Center}>
        <LoadingText>Loading game...</LoadingText>
      </Bg>
    );
  }

  if (state.error) {
    return (
      <Bg as={Center}>
        <Padding>
          <ErrorBox>
            <ErrorTitle>Error</ErrorTitle>
            <div style={{ color: '#fff' }}>{state.error}</div>
            <Btn onClick={() => navigate('/')}>Voltar a Home</Btn>
          </ErrorBox>
        </Padding>
      </Bg>
    );
  }

  return (
    <Bg>
      <Padding>
        <Container>
          <Header>
            <Title>💣 B-O-BOMB</Title>
            {state.session && (
              <StatusText>
                Status: {state.session.status}
                {typeof state.session.score === 'number' && (
                  <> | Score: {state.session.score}</>
                )}
              </StatusText>
            )}
          </Header>

          <GameTimer timeRemaining={state.timeRemaining} />

          {state.session?.status === 'waiting' && (
            <GameWaiting />
          )}

          {state.session?.status === 'active' && state.currentQuestion && (
            <QuestionCard
              question={state.currentQuestion}
              onAnswer={handleAnswer}
              disabled={isSubmitting}
            />
          )}
        </Container>
      </Padding>
    </Bg>
  );
};

export default GamePage;