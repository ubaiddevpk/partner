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
        <Route
          path="/signup"
          element={<PublicRoute element={<PartnerSignupPage />} />}
        />
        <Route
          path="/login"
          element={<PublicRoute element={<PartnerLoginPage />} />}
        />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />

        {/* Onboarding - Requires auth but not business */}
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute
              element={<OnboardingPage />}
              requiresBusiness={false}
            />
          }
        />

        {/* Protected Routes - Require auth AND business */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={
                <Layout>
                  <DashboardPage />
                </Layout>
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
                <Layout>
                  <ProjectsPage />
                </Layout>
              }
              requiresBusiness={false}
            />
          }
        />

        {/* Add this - Project Details */}
        <Route
          path="/projects/:id"
          element={
            <ProtectedRoute
              element={
                <Layout>
                  <ProjectDetailsPage />
                </Layout>
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
                <Layout>
                  <ClientsPage />
                </Layout>
              }
              requiresBusiness={false}
            />
          }
        />

        {/* Add this - Client Details */}
        <Route
          path="/clients/:id"
          element={
            <ProtectedRoute
              element={
                <Layout>
                  <ClientDetailsPage />
                </Layout>
              }
              requiresBusiness={false}
            />
          }
        />

        {/* Invoice Routes - ORDER IS CRITICAL */}

        {/* 1. Most specific first - /invoices/create */}
        <Route
          path="/invoices/create"
          element={
            <ProtectedRoute
              element={
                <Layout>
                  <CreateInvoicePage />
                </Layout>
              }
              requiresBusiness={false}
            />
          }
        />

        {/* 2. Dynamic route second - /invoices/:id */}
        <Route
          path="/invoices/:id"
          element={
            <ProtectedRoute
              element={
                <Layout>
                  <InvoiceDetailsPage />
                </Layout>
              }
              requiresBusiness={false}
            />
          }
        />

        {/* 3. List page last - /invoices */}
        <Route
          path="/invoices"
          element={
            <ProtectedRoute
              element={
                <Layout>
                  <InvoicesPage />
                </Layout>
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
                <Layout>
                  <SettingsPage />
                </Layout>
              }
              requiresBusiness={false}
            />
          }
        />
      </Router>
    </AuthProvider>
  );
}
