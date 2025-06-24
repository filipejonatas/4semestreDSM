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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 2;
  min-width: 200px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Select = styled.select`
  flex: 1;
  min-width: 150px;
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
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #218838;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const AddTask: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const { categories, addTask } = useTaskContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim() && selectedCategoryId) {
      addTask(taskTitle, selectedCategoryId);
      setTaskTitle('');
      setSelectedCategoryId('');
    }
  };

  return (
    <Container>
      <Title>Nova Tarefa</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Título da tarefa"
        />
        <Select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
        >
          <option value="">Selecione uma categoria</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        <Button 
          type="submit" 
          disabled={!taskTitle.trim() || !selectedCategoryId}
        >
          Adicionar Tarefa
        </Button>
      </Form>
    </Container>
  );
};

export default AddTask;