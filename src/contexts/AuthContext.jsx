import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ ADD THIS: Function to manually refresh user data
  const refreshUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("business_name, full_name, phone")
          .eq("id", session.user.id)
          .maybeSingle();

        setUser({
          id: session.user.id,
          name: profile?.full_name || session.user.user_metadata?.full_name || "User",
          email: session.user.email,
          phone: profile?.phone || "",
          businessName: profile?.business_name || null,
        });
      }
    } catch (error) {
      console.error("Error refreshing user:", error);
    }
  };

  useEffect(() => {
    let mounted = true;
    let timeoutId;

    const checkAuth = async () => {
      try {
        // Check if we're on the callback page - if so, give more time for OAuth processing
        const isCallbackPage = window.location.pathname === '/auth/callback';
        const timeoutDuration = isCallbackPage ? 10000 : 5000; // 10s for callback, 5s otherwise

        timeoutId = setTimeout(() => {
          if (mounted && isLoading) {
            // Only warn if not on callback page (callback page handles its own flow)
            if (!isCallbackPage) {
              console.warn('Auth check timeout - proceeding as unauthenticated');
            }
            setIsLoading(false);
            setUser(null);
          }
        }, timeoutDuration);

        // Wait a bit longer on callback page for OAuth hash processing
        if (isCallbackPage) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

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
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("business_name, full_name, phone")
            .eq("id", session.user.id)
            .maybeSingle();

          if (profileError) {
            console.error("Profile fetch error:", profileError);
          }

          if (mounted) {
            setUser({
              id: session.user.id,
              name: profile?.full_name || session.user.user_metadata?.full_name || "User",
              email: session.user.email,
              phone: profile?.phone || "",
              businessName: profile?.business_name || null,
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

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      if (!mounted) return;
      
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("business_name, full_name, phone")
          .eq("id", session.user.id)
          .maybeSingle();

        if (mounted) {
          setUser({
            id: session.user.id,
            name: profile?.full_name || session.user.user_metadata?.full_name || "User",
            email: session.user.email,
            phone: profile?.phone || "",
            businessName: profile?.business_name || null,
          });
          setIsLoading(false);
        }
      } else if (event === 'SIGNED_OUT') {
        if (mounted) {
          setUser(null);
          setIsLoading(false);
        }
      } else if (event === 'TOKEN_REFRESHED') {
        checkAuth();
      }
      // ✅ ADD THIS: Listen for user updates
      else if (event === 'USER_UPDATED') {
        await refreshUser();
      }
    });

    // ✅ ADD THIS: Listen for profile updates via storage events
    const handleStorageChange = (e) => {
      if (e.key === 'profile_updated') {
        refreshUser();
        localStorage.removeItem('profile_updated');
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
      window.location.href = '/login';
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