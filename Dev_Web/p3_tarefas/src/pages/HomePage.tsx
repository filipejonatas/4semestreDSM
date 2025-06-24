import React from 'react';
import styled from 'styled-components';
import AddCategory from '../components/AddCategory';
import AddTask from '../components/AddTask';
import CategoryList from '../components/CategoryList';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  background: linear-gradient(135deg, #007bff, #0056b3);
  border-radius: 12px;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 123, 255, 0.3);
`;

const MainTitle = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
`;

const Subtitle = styled.p`
  margin: 0.5rem 0 0 0;
  font-size: 1.2rem;
  opacity: 0.9;
  font-weight: 300;
`;

const FormsSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const TasksSection = styled.section`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #28a745, #20c997);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  text-align: center;
  min-width: 120px;
  box-shadow: 0 2px 4px rgba(40, 167, 69, 0.3);
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const HomePage: React.FC = () => {
  return (
    <Container>
      <Header>
        <MainTitle>Gerenciador de Tarefas</MainTitle>
        <Subtitle>Organize suas atividades por categoria</Subtitle>
      </Header>

      <FormsSection>
        <AddCategory />
        <AddTask />
      </FormsSection>

      <TasksSection>
        <CategoryList />
      </TasksSection>
    </Container>
  );
};

export default HomePage;