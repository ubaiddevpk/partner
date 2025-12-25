import React, { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import PartnerSignupPage from "./pages/PartnerSignupPage";
import PartnerLoginPage from "./pages/PartnerLoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import Layout from "./components/layout/Layout";
import DashboardPage from "./pages/Dashboardpage";
import ClientsPage from "./pages/ClientsPage";
import ProjectsPage from "./pages/Projectspage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import ClientDetailsPage from "./pages/ClientDetailsPage";
// Add these imports at the top
import InvoicesPage from "./pages/InvoicesPage";
import CreateInvoicePage from "./pages/CreateInvoicePage";
import InvoiceDetailsPage from "./pages/InvoiceDetailsPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showClientDetails, setShowClientDetails] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // Add these states for project navigation
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const businessName = localStorage.getItem("businessName");
      const onboardingComplete = localStorage.getItem("onboardingComplete");
      const userData = localStorage.getItem("user");

      if (businessName && onboardingComplete === "true") {
        setUser({
          name: userData ? JSON.parse(userData).name : "User",
          businessName: businessName,
          email: userData ? JSON.parse(userData).email : "user@example.com",
        });
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [currentPath]);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);

      if (window.location.pathname !== "/projects") {
        setShowProjectDetails(false);
        setSelectedProject(null);
      }
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);

      if (window.location.pathname !== "/projects") {
        setShowProjectDetails(false);
        setSelectedProject(null);
      }

      // Add this block for invoices
      if (window.location.pathname !== "/invoices") {
        setShowCreateInvoice(false);
        setShowInvoiceDetails(false);
        setSelectedInvoice(null);
      }
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const handleOnboardingComplete = (businessName) => {
    const userData = {
      name: "User",
      businessName: businessName,
      email: "user@example.com",
    };

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="text-center">
          <div className="w-16 h-16  rounded-2xl flex items-center justify-center shadow-large mb-4 animate-pulse mx-auto">
             <img
            src="/logo.png"
            alt="Partner Logo"
            className="w-10 h-10 object-contain"
          />
          </div>
          <p className="text-neutral-600 font-medium">Loading Partner...</p>
        </div>
      </div>
    );
  }

  const publicRoutes = ["/", "/signup", "/login"];
  const isPublicRoute = publicRoutes.includes(currentPath);

  const protectedRoutes = [
    "/dashboard",
    "/ask-ai",
    "/projects",
    "/clients",
    "/invoices",
    "/feed",
    "/settings",
  ];
  const isProtectedRoute = protectedRoutes.includes(currentPath);

  if (isPublicRoute) {
    if (user && currentPath !== "/") {
      window.history.pushState({}, "", "/dashboard");
      window.location.reload();
      return null;
    }

    if (currentPath === "/") return <LandingPage />;
    if (currentPath === "/signup") return <PartnerSignupPage />;
    if (currentPath === "/login") return <PartnerLoginPage />;
  }

  if (currentPath === "/onboarding") {
    if (user) {
      window.history.pushState({}, "", "/dashboard");
      window.location.reload();
      return null;
    }
    return <OnboardingPage onComplete={handleOnboardingComplete} />;
  }

  if (isProtectedRoute) {
    if (!user) {
      window.history.pushState({}, "", "/login");
      window.location.reload();
      return null;
    }

    if (!user.businessName) {
      window.history.pushState({}, "", "/onboarding");
      window.location.reload();
      return null;
    }

    return (
      <Layout currentPath={currentPath} user={user}>
        {currentPath === "/dashboard" && ( // In App.jsx
          <DashboardPage
            user={user}
            onNavigateToProjects={(data) => {
              if (data.action === "new") {
                // Navigate to create project
                setShowProjectDetails(true);
                setSelectedProject({ id: "new", name: "New Project" });
              } else if (data.action === "view") {
                // Navigate to project details
                setShowProjectDetails(true);
                setSelectedProject(data.project);
              }
            }}
          />
        )}

        {/* Projects Page with Details */}
        {currentPath === "/projects" &&
          (showProjectDetails ? (
            <ProjectDetailsPage
              project={selectedProject}
              onBack={() => setShowProjectDetails(false)}
            />
          ) : (
            <ProjectsPage
              onNavigateToProject={(project) => {
                setSelectedProject(project);
                setShowProjectDetails(true);
              }}
            />
          ))}
        {currentPath === "/clients" &&
          (showClientDetails ? (
            <ClientDetailsPage
              client={selectedClient}
              onBack={() => setShowClientDetails(false)}
            />
          ) : (
            <ClientsPage
              onClientClick={(client) => {
                setSelectedClient(client);
                setShowClientDetails(true);
              }}
            />
          ))}
        {currentPath === "/invoices" &&
          (showCreateInvoice ? (
            <CreateInvoicePage
              onBack={() => setShowCreateInvoice(false)}
              user={user}
            />
          ) : showInvoiceDetails ? (
            <InvoiceDetailsPage
              invoice={selectedInvoice}
              onBack={() => setShowInvoiceDetails(false)}
              user={user}
            />
          ) : (
            <InvoicesPage
              onInvoiceClick={(invoice) => {
                setSelectedInvoice(invoice);
                setShowInvoiceDetails(true);
              }}
              onCreateInvoice={() => setShowCreateInvoice(true)}
            />
          ))}
        {currentPath === "/settings" && <SettingsPage user={user} />}
      </Layout>
    );
  }

  window.history.pushState({}, "", "/");
  return <LandingPage />;
}
