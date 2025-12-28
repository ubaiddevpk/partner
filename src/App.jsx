import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { Router, Route } from "./utils/router";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";
import { PublicRoute } from "./components/shared/PublicRoute";
import AuthCallback from "./pages/auth/AuthCallback";
// Page imports
import LandingPage from "./pages/LandingPage";
import PartnerSignupPage from "./pages/auth/PartnerSignupPage";
import PartnerLoginPage from "./pages/auth/PartnerLoginPage";
import OnboardingPage from "./pages/auth/OnboardingPage";
import AuthCallbackPage from "./pages/auth/AuthCallbackPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import ClientsPage from "./pages/clients/ClientsPage";
import InvoicesPage from "./pages/invoices/InvoicesPage";
import SettingsPage from "./pages/settings/SettingsPage";
import CreateInvoicePage from "./pages/invoices/CreateInvoicePage"; // Fixed typo
import InvoiceDetailsPage from "./pages/invoices/InvoiceDetailsPage"; // Fixed typo
import ProjectDetailsPage from "./pages/projects/ProjectDetailsPage"; // Fixed typo
import ClientDetailsPage from "./pages/clients/ClientDetailsPage"; // Fixed typo

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
      <Route path="/auth/callback" element={<AuthCallback />} />

        
        {/* Onboarding - Requires auth but not business */}
        <Route 
          path="/onboarding" 
          element={<ProtectedRoute element={<OnboardingPage />} requiresBusiness={false} />} 
        />
        
        {/* Protected Routes - Require auth AND business */}
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute element={<Layout><DashboardPage /></Layout>} requiresBusiness={false} />} 
        />
        
        <Route 
          path="/projects" 
          element={<ProtectedRoute element={<Layout><ProjectsPage /></Layout>} requiresBusiness={true} />} 
        />
        
        {/* Add this - Project Details */}
        <Route 
          path="/projects/:id" 
          element={<ProtectedRoute element={<Layout><ProjectDetailsPage /></Layout>} requiresBusiness={true} />} 
        />
        
        <Route 
          path="/clients" 
          element={<ProtectedRoute element={<Layout><ClientsPage /></Layout>} requiresBusiness={true} />} 
        />
        
        {/* Add this - Client Details */}
        <Route 
          path="/clients/:id" 
          element={<ProtectedRoute element={<Layout><ClientDetailsPage /></Layout>} requiresBusiness={true} />} 
        />
        
        <Route 
          path="/invoices" 
          element={<ProtectedRoute element={<Layout><InvoicesPage /></Layout>} requiresBusiness={true} />} 
        />
        
        {/* Add this - Create Invoice */}
        <Route 
          path="/invoices/create" 
          element={<ProtectedRoute element={<Layout><CreateInvoicePage /></Layout>} requiresBusiness={true} />} 
        />
        
        {/* Add this - Invoice Details */}
        <Route 
          path="/invoices/:id" 
          element={<ProtectedRoute element={<Layout><InvoiceDetailsPage /></Layout>} requiresBusiness={true} />} 
        />
        
        <Route 
          path="/settings" 
          element={<ProtectedRoute element={<Layout><SettingsPage /></Layout>} requiresBusiness={true} />} 
        />
      </Router>
    </AuthProvider>
  );
}