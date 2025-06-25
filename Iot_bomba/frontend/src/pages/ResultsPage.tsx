import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GameResult from '../components/GameResult';

const Bg = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #000 100%);
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

const Btn = styled.button`
  margin-top: 24px;
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

const ResultPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();

  return (
    <Bg>
      <Padding>
        <Container>
          <Header>
            <Title>🎉 Resultado</Title>
          </Header>
          {sessionId && (
            <GameResult
              sessionId={sessionId}
              success={false} 
              score={0}      
              onRestart={() => navigate('/')} 
            />
          )}
          <Btn onClick={() => navigate('/')}>Voltar a Home</Btn>
        </Container>
      </Padding>
    </Bg>
  );
};

export default ResultPage;