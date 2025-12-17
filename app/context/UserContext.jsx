'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export function UserProvider({ children }) {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user || profile) return; 

    const fetchOrCreateProfile = async () => {
      try {
        console.log('Fetching/creating Strapi profile for user:', user);

        const res = await fetch('/api/user-profile', {
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            supabase_user_id: user.id,
            email: user.email,
            name: user.user_metadata?.full_name || user.email,
            phone: user.user_metadata?.phone || null,
          }),
        });

        const text = await res.text();
        console.log('/api/user-profile raw response:', text);

        if (!res.ok) throw new Error(`Failed: ${res.status} ${text}`);

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error('Failed to fetch/create profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrCreateProfile();
  }, [user, authLoading, profile]);

  return (
    <UserContext.Provider value={{ profile, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserProfile = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUserProfile must be used within UserProvider");
  return context;
};
