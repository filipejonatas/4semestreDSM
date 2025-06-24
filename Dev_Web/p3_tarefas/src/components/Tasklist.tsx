import React from 'react';
import styled from 'styled-components';
import { useTaskContext } from '../hooks/useTaskContext';

const Container = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const CategoryTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 1rem;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 0.5rem;
`;

const NoTasks = styled.p`
  color: #666;
  font-style: italic;
  text-align: center;
  padding: 1rem;
`;

const TasksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TaskItem = styled.li<{ completed: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  background-color: ${props => props.completed ? '#f0f8f0' : '#fafafa'};
  border-color: ${props => props.completed ? '#d4edda' : '#f0f0f0'};
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
`;

const TaskLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  flex: 1;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
  transform: scale(1.2);
`;

const TaskTitle = styled.span<{ completed: boolean }>`
  flex: 1;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  color: ${props => props.completed ? '#666' : '#333'};
`;

const TaskStatus = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
`;

interface TaskListProps {
  categoryId: string;
  categoryName: string;
}

const TaskList: React.FC<TaskListProps> = ({ categoryId, categoryName }) => {
  const { getTasksByCategory, toggleTaskComplete } = useTaskContext();
  const tasks = getTasksByCategory(categoryId);

  const handleToggleTask = (taskId: string) => {
    toggleTaskComplete(taskId);
  };

  return (
    <Container>
      <CategoryTitle>{categoryName}</CategoryTitle>
      {tasks.length === 0 ? (
        <NoTasks>Nenhuma tarefa nesta categoria</NoTasks>
      ) : (
        <TasksList>
          {tasks.map(task => (
            <TaskItem key={task.id} completed={task.completed}>
              <TaskLabel>
                <Checkbox
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id)}
                />
                <TaskTitle completed={task.completed}>
                  {task.title}
                </TaskTitle>
              </TaskLabel>
              <TaskStatus>
                {task.completed ? '✅ Concluída' : '⏳ Pendente'}
              </TaskStatus>
            </TaskItem>
          ))}
        </TasksList>
      )}
    </Container>
  );
};

export default TaskList;