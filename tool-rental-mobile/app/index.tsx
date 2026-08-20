import { Redirect } from 'expo-router';
import { useAuthStore } from '@/stores/auth.store';
import { useEffect, useState } from 'react';

export default function Index() {
  const { user, isLoading, loadUser } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadUser().finally(() => setIsReady(true));
  }, []);

  if (!isReady || isLoading) {
    return null; // Or a loading screen
  }

  if (user) {
    return <Redirect href="/(main)/home" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
}