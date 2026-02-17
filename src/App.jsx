import React from 'react';
import { BoardProvider } from './context/BoardContext';
import MainLayout from './components/layout/MainLayout';

function App() {
  return (
    <BoardProvider>
      <MainLayout />
    </BoardProvider>
  );
}

export default App;