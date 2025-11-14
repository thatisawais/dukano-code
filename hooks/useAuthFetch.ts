/**
 * Custom hook for making authenticated API calls
 * Automatically includes access token in Authorization header
 */

'use client';

import { useAppSelector } from '@/lib/redux/hooks';

export function useAuthFetch() {
  const { accessToken } = useAppSelector((state) => state.auth);

  const authFetch = async (url: string, options: RequestInit = {}) => {
    const headers: HeadersInit = {
      ...options.headers,
      'Content-Type': 'application/json',
    };

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return fetch(url, {
      ...options,
      headers,
    });
  };

  return authFetch;
}
