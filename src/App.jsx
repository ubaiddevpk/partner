import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { Router, Route } from "./utils/router";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";
import { PublicRoute } from "./components/shared/PublicRoute";

// Page imports
import LandingPage from "./pages/LandingPage";
import PartnerSignupPage from "./pages/auth/PartnerSignupPage";
import PartnerLoginPage from "./pages/auth/PartnerLoginPage";
import OnboardingPage from "./pages/auth/OnboardingPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import ClientsPage from "./pages/clients/ClientsPage";
import InvoicesPage from "./pages/invoices/InvoicesPage";
import SettingsPage from "./pages/settings/SettingsPage";

// Layout
import Layout from "./components/layout/Layout";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Public Routes */}
        <Route path="/" element={<PublicRoute element={<LandingPage />} />} />
        <Route path="/signup" element={<PublicRoute element={<PartnerSignupPage />} />} />
        <Route path="/login" element={<PublicRoute element={<PartnerLoginPage />} />} />
        
        {/* Onboarding - Requires auth but not business */}
        <Route 
          path="/onboarding" 
          element={<ProtectedRoute element={<OnboardingPage />} requiresBusiness={false} />} 
        />
        
        {/* Protected Routes - Require auth AND business */}
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute element={<Layout><DashboardPage /></Layout>} requiresBusiness={true} />} 
        />
        <Route 
          path="/projects" 
          element={<ProtectedRoute element={<Layout><ProjectsPage /></Layout>} requiresBusiness={true} />} 
        />
        <Route 
          path="/clients" 
          element={<ProtectedRoute element={<Layout><ClientsPage /></Layout>} requiresBusiness={true} />} 
        />
        <Route 
          path="/invoices" 
          element={<ProtectedRoute element={<Layout><InvoicesPage /></Layout>} requiresBusiness={true} />} 
        />
        <Route 
          path="/settings" 
          element={<ProtectedRoute element={<Layout><SettingsPage /></Layout>} requiresBusiness={true} />} 
        />
      </Router>
    </AuthProvider>
  );
}