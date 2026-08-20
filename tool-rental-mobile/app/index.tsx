import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useAuthStore } from '@/stores/auth.store';

export default function Index() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <Redirect href={isAuthenticated ? '/home' : '/login'} />;
}
