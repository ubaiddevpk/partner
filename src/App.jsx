// src/App.jsx - OPTIMIZED VERSION
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
import AuthCallbackPage from "./pages/auth/AuthCallbackPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import ClientsPage from "./pages/clients/ClientsPage";
import InvoicesPage from "./pages/invoices/InvoicesPage";
import SettingsPage from "./pages/settings/SettingsPage";
import CreateInvoicePage from "./pages/invoices/CreateInvoicePage";
import InvoiceDetailsPage from "./pages/invoices/InvoiceDetailsPage";
import ProjectDetailsPage from "./pages/projects/ProjectDetailsPage";
import ClientDetailsPage from "./pages/clients/ClientDetailsPage";
import CreateEstimatePage from "./pages/projects/CreateEstimatePage";

// Layout - Import at top level
import Layout from "./components/layout/Layout";

// Create a wrapper component that stays mounted
const ProtectedLayout = ({ children }) => {
  return (
    <ProtectedRoute
      element={<Layout>{children}</Layout>}
      requiresBusiness={false}
    />
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Public Routes - No Layout */}
        <Route path="/" element={<PublicRoute element={<LandingPage />} />} />
        <Route
          path="/signup"
          element={<PublicRoute element={<PartnerSignupPage />} />}
        />
        <Route
          path="/login"
          element={<PublicRoute element={<PartnerLoginPage />} />}
        />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />

        {/* Onboarding - No Layout */}
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute
              element={<OnboardingPage />}
              requiresBusiness={false}
            />
          }
        />

        {/* Protected Routes - Wrapped in persistent Layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedLayout>
              <DashboardPage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedLayout>
              <ProjectsPage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/projects/:id"
          element={
            <ProtectedLayout>
              <ProjectDetailsPage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/projects/:id/estimates/create"
          element={
            <ProtectedLayout>
              <CreateEstimatePage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/clients"
          element={
            <ProtectedLayout>
              <ClientsPage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/clients/:id"
          element={
            <ProtectedLayout>
              <ClientDetailsPage />
            </ProtectedLayout>
          }
        />

        {/* Invoice Routes */}
        <Route
          path="/invoices/create"
          element={
            <ProtectedLayout>
              <CreateInvoicePage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/invoices/:id"
          element={
            <ProtectedLayout>
              <InvoiceDetailsPage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/invoices"
          element={
            <ProtectedLayout>
              <InvoicesPage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedLayout>
              <SettingsPage />
            </ProtectedLayout>
          }
        />
      </Router>
    </AuthProvider>
  );
}
