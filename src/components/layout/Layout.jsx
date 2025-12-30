import React, { useState } from "react";
import Sidebar from "./Sidebar";
import AIChatPanel from "../AIChatPanel";
import {
  Search,
  Bell,
  Menu,
  X,
  LayoutDashboard,
  Sparkles,
  FolderOpen,
  Users,
  Rss,
} from "lucide-react";
import { supabase } from "../../utils/supabase";
import { useAuthProfile } from "../../hooks/useAuth";

const Layout = ({ children, currentPath }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [notifications] = useState(3);
  const { user, profile, loading } = useAuthProfile();

  if (loading) return null; // or loader

  if (!user) {
    window.location.replace("/login");
    return null;
  }

const handleLogout = async () => {
  await supabase.auth.signOut();
  window.location.replace("/login");
};

  const handleNavigate = (path) => {
    setIsMobileMenuOpen(false);
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const getPageTitle = () => {
    const pathMap = {
      "/dashboard": "Dashboard",
      "/ask-ai": "Ask AI",
      "/projects": "Projects",
      "/clients": "Clients",
      "/invoices": "Invoices",
      "/feed": "Feed",
      "/settings": "Settings",
    };
    return pathMap[currentPath] || "Dashboard";
  };

  const mobileNavItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/projects", icon: FolderOpen, label: "Projects" },
    { path: "/ask-ai", icon: Sparkles, label: "AI" },
    { path: "/clients", icon: Users, label: "Clients" },
    { path: "/feed", icon: Rss, label: "Feed" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          currentPath={currentPath}
          user={{
            name: profile?.full_name,
            businessName: profile?.business_name,
          }}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onOpenChat={handleOpenChat}
          isCollapsed={isChatOpen}
        />
      </div>

      {/* AI Chat Panel - Opens next to sidebar */}
      {isChatOpen && (
        <div className="hidden lg:block">
          <AIChatPanel user={user} onClose={handleCloseChat} />
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          <div className="fixed inset-y-0 left-0 w-64 z-50 lg:hidden animate-slide-in-right">
            <Sidebar
              currentPath={currentPath}
              user={user}
              onNavigate={handleNavigate}
              onLogout={handleLogout}
              onOpenChat={handleOpenChat}
            />
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>

              <div>
                <h1 className="text-xl font-bold text-neutral-900">
                  {getPageTitle()}
                </h1>
                {user?.businessName && (
                  <p className="text-xs text-neutral-500 hidden sm:block">
                    {user.businessName}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors">
                <Search className="w-5 h-5" />
              </button>

              <button className="relative w-10 h-10 flex items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-gradient-to-r from-error to-accent-orange text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              <button
                onClick={() => handleNavigate("/settings")}
                className="lg:hidden w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-soft hover:shadow-medium transition-all"
              >
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">{children}</div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-30 safe-area-inset-bottom">
          <div className="grid grid-cols-5 h-16">
            {mobileNavItems.map((item) => {
              const Icon = item.icon;
              const active = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() =>
                    item.path === "/ask-ai"
                      ? handleOpenChat()
                      : handleNavigate(item.path)
                  }
                  className={`flex flex-col items-center justify-center gap-1 transition-colors relative ${
                    active
                      ? "text-primary-600"
                      : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      active ? "scale-110" : ""
                    } transition-transform`}
                    strokeWidth={active ? 2.5 : 2}
                  />
                  <span
                    className={`text-xs font-medium ${
                      active ? "font-semibold" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                  {active && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-t-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Layout;
