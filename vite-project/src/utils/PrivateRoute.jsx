import React from 'react';
import { Navigate } from 'react-router-dom';
import useStudentAuth from '../hooks/useStudentAuth';

function PrivateRoute({ children }) {
  const isStudentAuth = useStudentAuth();
  return isStudentAuth ? children : <Navigate to="/" />;
}

export default PrivateRoute;
