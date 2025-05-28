import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './page/Sigup';
import './index.css';
import Dashboard from './page/deshbord';
import Login from './page/login';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('loggedIn');

  return (
    
    
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<div className="text-center mt-10">404: Page Not Found</div>} />
      </Routes>
  );
};

export default App;