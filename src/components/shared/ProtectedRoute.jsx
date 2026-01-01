// // 


// import React from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import Loading from '../ui/Loading';

// export const ProtectedRoute = ({ element }) => {
//   const { user, isLoading } = useAuth();

//   if (isLoading) {
//     return <Loading />;
//   }

//   // Not authenticated -> redirect to login
//   if (!user) {
//     console.log('❌ No user, redirecting to login');
//     window.location.href = '/login';
//     return null;
//   }

//   // Authenticated -> render the element
//   return element;
// };


// src/components/shared/ProtectedRoute.jsx - OPTIMIZED
import React, { useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../ui/Loading';

export const ProtectedRoute = ({ element }) => {
  const { user, isLoading } = useAuth();
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Only redirect once when not loading and no user
    if (!isLoading && !user && !hasRedirected.current) {
      hasRedirected.current = true;
      console.log('❌ No user, redirecting to login');
      window.location.replace('/login');
    }
  }, [user, isLoading]);

  // Show loading only on initial mount
  if (isLoading) {
    return <Loading />;
  }

  // If no user, return null (redirect is happening)
  if (!user) {
    return null;
  }

  // User exists - render element
  return element;
};