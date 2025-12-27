import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../ui/Loading';

export const PublicRoute = ({ element }) => {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    const currentPath = window.location.pathname;

    // If authenticated and has business name, redirect to dashboard
    if (user?.businessName) {
      console.log('✅ User already authenticated with business, redirecting to dashboard');
      if (currentPath === '/login' || currentPath === '/signup' || currentPath === '/') {
        window.location.href = '/dashboard';
      }
      return;
    }

    // If authenticated but no business name, redirect to onboarding
    if (user && !user.businessName) {
      console.log('📝 User authenticated but no business, redirecting to onboarding');
      if (currentPath === '/login' || currentPath === '/signup') {
        window.location.href = '/onboarding';
      }
      return;
    }

  }, [user, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  // If user has business and trying to access public routes, don't show them
  if (user?.businessName) {
    return null;
  }

  return element;
};