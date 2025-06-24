import React, { useState } from 'react';
import styled from 'styled-components';
import { useTaskContext } from '../hooks/useTaskContext';

const Container = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const Title = styled.h3`
  margin-top: 0;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const AddCategory: React.FC = () => {
  const [categoryName, setCategoryName] = useState('');
  const { addCategory } = useTaskContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryName.trim()) {
      addCategory(categoryName);
      setCategoryName('');
    }
  };

  return (
    <Container>
      <Title>Nova Categoria</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Nome da categoria"
        />
        <Button type="submit" disabled={!categoryName.trim()}>
          Adicionar Categoria
        </Button>
      </Form>
    </Container>
  );
};

export default AddCategory;