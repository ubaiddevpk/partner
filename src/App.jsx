import React, { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import PartnerSignupPage from "./pages/PartnerSignupPage";
import PartnerLoginPage from "./pages/PartnerLoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import Layout from "./components/layout/Layout";
import DashboardPage from "./pages/Dashboardpage";
import AIChatbotPage from "./pages/AIChatbotPage";

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const businessName = localStorage.getItem('businessName');
      const onboardingComplete = localStorage.getItem('onboardingComplete');
      const userData = localStorage.getItem('user');

      if (businessName && onboardingComplete === 'true') {
        setUser({
          name: userData ? JSON.parse(userData).name : 'User',
          businessName: businessName,
          email: userData ? JSON.parse(userData).email : 'user@example.com'
        });
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [currentPath]);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const handleOnboardingComplete = (businessName) => {
    const userData = {
      name: 'User',
      businessName: businessName,
      email: 'user@example.com'
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-large mb-4 animate-pulse mx-auto">
            <span className="text-white font-bold text-2xl">P</span>
          </div>
          <p className="text-neutral-600 font-medium">Loading Partner...</p>
        </div>
      </div>
    );
  }

  const publicRoutes = ['/', '/signup', '/login'];
  const isPublicRoute = publicRoutes.includes(currentPath);

  const protectedRoutes = ['/dashboard', '/ask-ai', '/projects', '/clients', '/invoices', '/feed', '/settings'];
  const isProtectedRoute = protectedRoutes.includes(currentPath);

  if (isPublicRoute) {
    if (user && currentPath !== '/') {
      window.history.pushState({}, '', '/dashboard');
      window.location.reload();
      return null;
    }

    if (currentPath === '/') return <LandingPage />;
    if (currentPath === '/signup') return <PartnerSignupPage />;
    if (currentPath === '/login') return <PartnerLoginPage />;
  }

  if (currentPath === '/onboarding') {
    if (user) {
      window.history.pushState({}, '', '/dashboard');
      window.location.reload();
      return null;
    }
    return <OnboardingPage onComplete={handleOnboardingComplete} />;
  }

  if (isProtectedRoute) {
    if (!user) {
      window.history.pushState({}, '', '/login');
      window.location.reload();
      return null;
    }

    if (!user.businessName) {
      window.history.pushState({}, '', '/onboarding');
      window.location.reload();
      return null;
    }

    return (
      <Layout currentPath={currentPath} user={user}>
        {currentPath === '/dashboard' && <DashboardPage user={user} />}
        {currentPath === '/ask-ai' && <AIChatbotPage user={user} />}
        {currentPath === '/projects' && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-large mb-6 mx-auto">
              <span className="text-4xl">📁</span>
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Projects</h2>
            <p className="text-neutral-600 max-w-md mx-auto">
              Manage all your construction projects in one place.
            </p>
          </div>
        )}
        {currentPath === '/clients' && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center shadow-large mb-6 mx-auto">
              <span className="text-4xl">👥</span>
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Clients</h2>
            <p className="text-neutral-600 max-w-md mx-auto">
              Keep track of all your client relationships and communications.
            </p>
          </div>
        )}
        {currentPath === '/invoices' && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gradient-to-br from-accent-orange to-accent-yellow rounded-2xl flex items-center justify-center shadow-large mb-6 mx-auto">
              <span className="text-4xl">💳</span>
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Invoices</h2>
            <p className="text-neutral-600 max-w-md mx-auto">
              Create and manage professional invoices with ease.
            </p>
          </div>
        )}
        {currentPath === '/feed' && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-2xl flex items-center justify-center shadow-large mb-6 mx-auto">
              <span className="text-4xl">📡</span>
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Activity Feed</h2>
            <p className="text-neutral-600 max-w-md mx-auto">
              Stay updated with all your business activities and notifications.
            </p>
          </div>
        )}
        {currentPath === '/settings' && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gradient-to-br from-neutral-600 to-neutral-800 rounded-2xl flex items-center justify-center shadow-large mb-6 mx-auto">
              <span className="text-4xl">⚙️</span>
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Settings</h2>
            <p className="text-neutral-600 max-w-md mx-auto">
              Manage your account and business settings.
            </p>
          </div>
        )}
      </Layout>
    );
  }

  window.history.pushState({}, '', '/');
  return <LandingPage />;
}