import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUser } from './utils/storage';

const ProtectedRoute = ({ children }) => {
  const user = getUser();
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
