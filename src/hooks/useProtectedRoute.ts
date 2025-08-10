'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface UseProtectedRouteOptions {
  redirectTo?: string;
  requireAuth?: boolean;
}

export function useProtectedRoute(options: UseProtectedRouteOptions = {}) {
  const { redirectTo = '/signin', requireAuth = true } = options;
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        router.push(redirectTo);
      } else if (!requireAuth && isAuthenticated) {
        router.push('/'); // Redirect authenticated users away from auth pages
      }
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router]);

  return { isAuthenticated, isLoading };
}

export default useProtectedRoute;
