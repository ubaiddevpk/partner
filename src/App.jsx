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

// Layout - Import at top level
import Layout from "./components/layout/Layout";

// Create a Layout Wrapper that persists across routes
const LayoutWrapper = ({ children }) => {
  return <Layout>{children}</Layout>;
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

        {/* Protected Routes - All share SAME Layout instance */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={
                <LayoutWrapper>
                  <DashboardPage />
                </LayoutWrapper>
              }
              requiresBusiness={false}
            />
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute
              element={
                <LayoutWrapper>
                  <ProjectsPage />
                </LayoutWrapper>
              }
              requiresBusiness={false}
            />
          }
        />

        <Route
          path="/projects/:id"
          element={
            <ProtectedRoute
              element={
                <LayoutWrapper>
                  <ProjectDetailsPage />
                </LayoutWrapper>
              }
              requiresBusiness={false}
            />
          }
        />

        <Route
          path="/clients"
          element={
            <ProtectedRoute
              element={
                <LayoutWrapper>
                  <ClientsPage />
                </LayoutWrapper>
              }
              requiresBusiness={false}
            />
          }
        />

        <Route
          path="/clients/:id"
          element={
            <ProtectedRoute
              element={
                <LayoutWrapper>
                  <ClientDetailsPage />
                </LayoutWrapper>
              }
              requiresBusiness={false}
            />
          }
        />

        {/* Invoice Routes */}
        <Route
          path="/invoices/create"
          element={
            <ProtectedRoute
              element={
                <LayoutWrapper>
                  <CreateInvoicePage />
                </LayoutWrapper>
              }
              requiresBusiness={false}
            />
          }
        />

        <Route
          path="/invoices/:id"
          element={
            <ProtectedRoute
              element={
                <LayoutWrapper>
                  <InvoiceDetailsPage />
                </LayoutWrapper>
              }
              requiresBusiness={false}
            />
          }
        />

        <Route
          path="/invoices"
          element={
            <ProtectedRoute
              element={
                <LayoutWrapper>
                  <InvoicesPage />
                </LayoutWrapper>
              }
              requiresBusiness={false}
            />
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute
              element={
                <LayoutWrapper>
                  <SettingsPage />
                </LayoutWrapper>
              }
              requiresBusiness={false}
            />
          }
        />
      </Router>
    </AuthProvider>
  );
}