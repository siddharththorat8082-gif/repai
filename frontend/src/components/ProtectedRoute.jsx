import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = true; // 🔹 temporarily true ठेव (later auth logic लावू)

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;