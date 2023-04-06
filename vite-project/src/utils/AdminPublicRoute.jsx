import React from 'react';
import { Navigate } from 'react-router-dom';
import useAdminAuth from '../hooks/useAdminAuth';

function AdminPublicRoute({ children }) {
  const isAdminAuth = useAdminAuth();
  return !isAdminAuth ? children : <Navigate to="/admin/dashboard" />;
}

export default AdminPublicRoute;
