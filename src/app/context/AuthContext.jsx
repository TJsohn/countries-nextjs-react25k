'use client';
import { supabase } from "@/lib/supabase/supabase";
import { useRouter, usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle user routing behavior based on authentication state
  useEffect(() => {
    if (loading) return; // Don't redirect while loading

    // Protected routes that require authentication
    const protectedRoutes = ['/protected', '/profile'];
    
    // Routes that logged-in users shouldn't see
    const authRoutes = ['/login'];

    // If user is not authenticated and trying to access protected routes
    if (!user && protectedRoutes.includes(pathname)) {
      router.push('/login');
      return;
    }

    // If user is authenticated and on auth pages, redirect to countries
    if (user && authRoutes.includes(pathname)) {
      router.push('/countries');
      return;
    }

    // If user just logged in and on login page, redirect to countries
    if (user && pathname === '/login') {
      router.push('/countries');
      return;
    }

    // If user lands on home page, redirect to countries (better UX)
    if (pathname === '/') {
      router.push('/countries');
      return;
    }
  }, [user, loading, pathname, router]);

  const signOut = async () => {
    await supabase.auth.signOut();
    // After sign out, redirect to login
    router.push('/login');
  };

  const value = {
    session,
    user,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
 