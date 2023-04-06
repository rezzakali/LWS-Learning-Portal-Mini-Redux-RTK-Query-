import React from 'react';
import { Navigate } from 'react-router-dom';
import useStudentAuth from '../hooks/useStudentAuth';

function PublicRoute({ children }) {
  const isStudentAuth = useStudentAuth();
  return !isStudentAuth ? children : <Navigate to="/courseplayer" />;
}

export default PublicRoute;
