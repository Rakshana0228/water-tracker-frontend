// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !user.userId) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
