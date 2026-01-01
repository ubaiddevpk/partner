// 


import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../ui/Loading';

export const ProtectedRoute = ({ element }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  // Not authenticated -> redirect to login
  if (!user) {
    console.log('❌ No user, redirecting to login');
    window.location.href = '/login';
    return null;
  }

  // Authenticated -> render the element
  return element;
};
