import React from 'react';
import { TaskProvider } from './contexts/TaskContext';
import HomePage from './pages/HomePage';
import { GlobalStyles } from './styles/styles';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <TaskProvider>
        <HomePage />
      </TaskProvider>
    </>
  );
};

export default App;