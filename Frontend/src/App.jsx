// App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

const App = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('vibecheckUser');
    if (stored) setAuth(JSON.parse(stored));
  }, []);

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage setAuth={setAuth} />} />
      <Route
        path="/home"
        element={
          auth?.token ? (
            <HomePage auth={auth} />
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />
      <Route
        path="*"
        element={<Navigate to={auth?.token ? '/home' : '/auth'} replace />}
      />
    </Routes>
  );
};

export default App;
