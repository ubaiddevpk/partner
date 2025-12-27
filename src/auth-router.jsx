import React, { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "./supabase";

// ==================== AUTH CONTEXT ====================
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("business_name, full_name, phone")
            .eq("id", session.user.id)
            .single();

          setUser({
            id: session.user.id,
            name: profile?.full_name || session.user.user_metadata?.full_name || "User",
            email: session.user.email,
            phone: profile?.phone || "",
            businessName: profile?.business_name || null,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
