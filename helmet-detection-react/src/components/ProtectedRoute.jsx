import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    // notify user and redirect to login
    alert('Session timed out. Please login.');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
