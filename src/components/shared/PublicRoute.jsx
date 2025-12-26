import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../ui/Loading';

export const PublicRoute = ({ element }) => {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      const currentPath = window.location.pathname;
      
      // Allow landing page for authenticated users
      if (currentPath === "/") {
        return;
      }

      if (!user.businessName) {
        window.location.href = '/onboarding';
      } else {
        window.location.href = '/dashboard';
      }
    }
  }, [user, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return element;
};