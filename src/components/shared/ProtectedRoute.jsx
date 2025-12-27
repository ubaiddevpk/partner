import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../ui/Loading';

export const ProtectedRoute = ({ element, requiresBusiness = false }) => {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // Don't redirect while loading
    if (isLoading) return;

    const currentPath = window.location.pathname;

    // Not authenticated -> redirect to login
    if (!user) {
      console.log('❌ No user, redirecting to login');
      if (currentPath !== '/login') {
        window.location.href = '/login';
      }
      return;
    }

    // Authenticated but no business name -> redirect to onboarding
    if (requiresBusiness && !user.businessName) {
      console.log('📝 No business name, redirecting to onboarding');
      if (currentPath !== '/onboarding') {
        window.location.href = '/onboarding';
      }
      return;
    }

    // Has business name but on onboarding page -> redirect to dashboard
    if (currentPath === '/onboarding' && user.businessName) {
      console.log('🏢 Already has business, redirecting to dashboard');
      window.location.href = '/dashboard';
      return;
    }

    console.log('✅ Protected route check passed:', {
      hasUser: !!user,
      hasBusiness: !!user.businessName,
      requiresBusiness
    });

  }, [user, isLoading, requiresBusiness]);

  if (isLoading) {
    return <Loading />;
  }

  if (!user || (requiresBusiness && !user.businessName)) {
    return null;
  }

  return element;
};