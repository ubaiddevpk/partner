import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../ui/Loading';

export const ProtectedRoute = ({ element, requiresBusiness = false }) => {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        window.location.href = '/login';
      } else if (requiresBusiness && !user.businessName) {
        window.location.href = '/onboarding';
      }
    }
  }, [user, isLoading, requiresBusiness]);

  if (isLoading) {
    return <Loading />;
  }

  if (!user || (requiresBusiness && !user.businessName)) {
    return null;
  }

  return element;
};