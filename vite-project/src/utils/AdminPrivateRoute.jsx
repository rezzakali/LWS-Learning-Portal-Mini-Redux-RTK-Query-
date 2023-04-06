import React from 'react';
import { Navigate } from 'react-router-dom';
import useAdminAuth from '../hooks/useAdminAuth';

function PrivateRoute({ children }) {
  const isAdminAuth = useAdminAuth();
  return isAdminAuth ? children : <Navigate to="/admin" />;
}

export default PrivateRoute;
