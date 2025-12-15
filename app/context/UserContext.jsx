'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const UserContext = createContext(undefined);

export function UserProvider({ children }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user-profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            supabase_user_id: user.id,
            email: user.email,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to load profile");
        }

        const data = await res.json();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch/create profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <UserContext.Provider value={{ profile, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserProfile must be used within UserProvider");
  }
  return context;
}
