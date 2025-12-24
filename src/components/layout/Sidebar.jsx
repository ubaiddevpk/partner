import React from "react";
import {
  LayoutDashboard,
  Sparkles,
  FolderOpen,
  Users,
  Receipt,
  Rss,
  LogOut,
  Settings,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({ currentPath, user, onNavigate, onLogout, onOpenChat }) => {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      badge: null,
    },
    {
      id: "ai",
      label: "Ask AI",
      icon: Sparkles,
  
      badge: "New",
      path:"/ask-ai",
      badgeColor:
        "bg-gradient-to-r from-accent-purple to-accent-blue text-white",
    },
    {
      id: "projects",
      label: "Projects",
      icon: FolderOpen,
      path: "/projects",
      badge: null,
    },
    {
      id: "clients",
      label: "Clients",
      icon: Users,
      path: "/clients",
      badge: null,
    },
    {
      id: "invoices",
      label: "Invoices",
      icon: Receipt,
      path: "/invoices",
      badge: null,
    },
    {
      id: "feed",
      label: "Feed",
      icon: Rss,
      path: "/feed",
      badge: null,
    },
  ];

  const bottomItems = [
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  const handleItemClick = (item) => {
    if (item.action === "chat") {
      onOpenChat?.();
    } else if (item.path) {
      if (onNavigate) {
        onNavigate(item.path);
      } else {
        window.history.pushState({}, "", item.path);
        window.dispatchEvent(new PopStateEvent("popstate"));
      }
    }
  };

  const isActive = (path) => currentPath === path;

  return (
    <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col h-screen sticky top-0">
      {/* Logo Section */}
      <div className="p-6 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-soft">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <span className="text-xl font-bold text-neutral-900">Partner</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = item.path && isActive(item.path);

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                  active
                    ? "bg-primary-50 text-primary-700 font-semibold shadow-sm"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                }`}
              >
                {/* Active Indicator */}
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary-500 to-primary-600 rounded-r-full"></div>
                )}

                <Icon
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                    active ? "text-primary-600" : "group-hover:scale-110"
                  }`}
                  strokeWidth={active ? 2.5 : 2}
                />
                <span className="flex-1 text-left text-sm">{item.label}</span>

                {/* Badge */}
                {item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                      item.badgeColor || "bg-primary-100 text-primary-700"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Hover Arrow */}
                {!active && (
                  <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-neutral-200 p-3 space-y-1">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                active
                  ? "bg-primary-50 text-primary-700 font-semibold"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
              }`}
            >
              <Icon
                className="w-5 h-5 flex-shrink-0"
                strokeWidth={active ? 2.5 : 2}
              />
              <span className="flex-1 text-left text-sm">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* User Profile Section */}
      <div className="border-t border-neutral-200 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold shadow-soft">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-neutral-900 truncate">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-neutral-500 truncate">
              {user?.businessName || "Business Name"}
            </p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-neutral-600 hover:bg-neutral-50 hover:text-error transition-all duration-200 group"
        >
          <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;