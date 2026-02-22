import React, { useState, useEffect } from 'react';
import { BoardProvider } from './context/BoardContext';
import MainLayout from './components/layout/MainLayout';
import LoginView from './components/auth/LoginView';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("nura_user");
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem("nura_user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("nura_user");
    setUser(null);
  };

  if (loading) return null;

  return (
    <BoardProvider>
      {user ? (
        <MainLayout onLogout={handleLogout} />
      ) : (
        <LoginView onLogin={handleLogin} />
      )}
    </BoardProvider>
  );
}

export default App;