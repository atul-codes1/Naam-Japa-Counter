import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, openLogin } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      // Open login modal and pass the intended path so the app can redirect after login
      openLogin(location.pathname + (location.search || ''));
    }
  }, [isAuthenticated, openLogin, location]);

  if (!isAuthenticated) return null;

  return children;
};

export default ProtectedRoute;
