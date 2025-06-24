import React from 'react';
import styled from 'styled-components';
import { useTaskContext } from '../hooks/useTaskContext';
import TaskList from './Tasklist';

const Container = styled.div`
  margin-top: 2rem;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
`;

const NoCategories = styled.p`
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 2px dashed #dee2e6;
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CategoryList: React.FC = () => {
  const { categories } = useTaskContext();

  return (
    <Container>
      <Title>Minhas Categorias</Title>
      {categories.length === 0 ? (
        <NoCategories>
          Nenhuma categoria criada ainda. Crie sua primeira categoria acima!
        </NoCategories>
      ) : (
        <CategoriesContainer>
          {categories.map(category => (
            <TaskList
              key={category.id}
              categoryId={category.id}
              categoryName={category.name}
            />
          ))}
        </CategoriesContainer>
      )}
    </Container>
  );
};

export default CategoryList;