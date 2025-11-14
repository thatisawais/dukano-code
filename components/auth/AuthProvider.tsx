/**
 * Auth Provider Component
 * Handles automatic token refresh and user session management
 */

'use client';

import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setCredentials, logout, setLoading } from '@/lib/redux/features/authSlice';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);

  // Refresh access token
  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(
          setCredentials({
            user: data.user,
            accessToken: data.accessToken,
          })
        );
        return true;
      } else {
        dispatch(logout());
        return false;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      dispatch(logout());
      return false;
    }
  }, [dispatch]);

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      dispatch(setLoading(true));
      await refreshAccessToken();
      dispatch(setLoading(false));
    };

    initAuth();
  }, [dispatch, refreshAccessToken]);

  // Set up automatic token refresh
  useEffect(() => {
    if (!accessToken) return;

    // Refresh token every 14 minutes (access token expires in 15 minutes)
    const interval = setInterval(() => {
      refreshAccessToken();
    }, 14 * 60 * 1000);

    return () => clearInterval(interval);
  }, [accessToken, refreshAccessToken]);

  return <>{children}</>;
}
