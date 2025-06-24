import { useContext } from 'react';
import { TaskContext} from '../contexts/TaskContext'
import { TaskContextType } from '../types';

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext deve ser usado dentro de um TaskProvider');
  }
  return context;
};