import React from 'react';
import styled from 'styled-components';
import Leaderboard from '../components/Leaderboard';

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

const LeaderboardPage: React.FC = () => (
  <Bg>
    <Padding>
      <Container>
        <Header>
          <Title>🏆 Leaderboard</Title>
        </Header>
        <Leaderboard entries={[]} />
      </Container>
    </Padding>
  </Bg>
);

export default LeaderboardPage;