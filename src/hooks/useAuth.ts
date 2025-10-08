// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { Donor } from '@/payload-types';

export const useAuth = () => {
  const [user, setUser] = useState<Donor | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/users/me');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user || null);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to fetch user status:', error);
        setUser(null);
      } finally {
        setIsFetching(false);
      }
    };

    fetchUser();
  }, []);

  const isLoggedIn = user !== null;

  return { user, isLoggedIn, isFetching };
};
