import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      console.log("🔄 Refreshing user data...");
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        console.log("✅ User metadata:", session.user.user_metadata);

        setUser({
          id: session.user.id,
          name: session.user.user_metadata?.full_name || "User",
          email: session.user.email,
          phone: session.user.user_metadata?.phone || "",
          businessName: session.user.user_metadata?.business_name || null,
        });

        console.log(
          "✅ User state updated with businessName:",
          session.user.user_metadata?.business_name
        );
      }
    } catch (error) {
      console.error("❌ Error refreshing user:", error);
    }
  };

  useEffect(() => {
    let mounted = true;
    let timeoutId;

    const checkAuth = async () => {
      try {
        // Skip auth check on callback page
        if (window.location.pathname === "/auth/callback") {
          setIsLoading(false);
          return;
        }

        const timeoutDuration = 5000;

        timeoutId = setTimeout(() => {
          if (mounted && isLoading) {
            console.warn("Auth check timeout - proceeding as unauthenticated");
            setIsLoading(false);
            setUser(null);
          }
        }, timeoutDuration);

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Session error:", sessionError);
          if (mounted) {
            setUser(null);
            setIsLoading(false);
          }
          clearTimeout(timeoutId);
          return;
        }

        if (!mounted) return;

        if (session?.user) {
          if (mounted) {
            setUser({
              id: session.user.id,
              name: session.user.user_metadata?.full_name || "User",
              email: session.user.email,
              phone: session.user.user_metadata?.phone || "",
              businessName: session.user.user_metadata?.business_name || null,
            });
          }
        } else {
          if (mounted) {
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
        if (mounted) {
          setUser(null);
        }
      } finally {
        clearTimeout(timeoutId);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    checkAuth();

   const {
  data: { subscription },
} = supabase.auth.onAuthStateChange(async (event, session) => {
  console.log("🔔 Auth state changed:", event);

  if (!mounted) return;

  if (event === "SIGNED_IN" && session?.user) {
    if (mounted) {
      setUser({
        id: session.user.id,
        name: session.user.user_metadata?.full_name || "User",
        email: session.user.email,
        phone: session.user.user_metadata?.phone || "",
        businessName: session.user.user_metadata?.business_name || null,
      });
      setIsLoading(false);
    }
  } else if (event === "SIGNED_OUT") {
    console.log("🚪 Sign out event detected");
    if (mounted) {
      setUser(null);
      setIsLoading(false);
      // Force redirect to login
      window.location.replace('/login');
    }
  } else if (event === "TOKEN_REFRESHED") {
    console.log("🔄 Token refreshed, checking auth");
    await checkAuth();
  } else if (event === "USER_UPDATED") {
    console.log("👤 User updated, refreshing");
    await refreshUser();
    
  }
  
});

    // Listen for profile updates via storage events
    const handleStorageChange = (e) => {
      if (e.key === "profile_updated") {
        refreshUser();
        localStorage.removeItem("profile_updated");
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

const logout = async () => {
  try {
    console.log("🚪 Logging out...");
    
    // Clear user state immediately
    setUser(null);
    
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Logout error:', error);
    }
    
    // Clear all possible auth storage
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear cookies if any
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    
    console.log("✅ Logged out successfully");
    
    // Force complete reload to login page
    window.location.replace('/login');
  } catch (error) {
    console.error('Logout error:', error);
    
    // Even if there's an error, clear everything and redirect
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace('/login');
  }
};

  return (
    <AuthContext.Provider value={{ user, isLoading, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};