import { useAuthStore } from '@/stores/auth.store';

export function useAuth() {
  const { user, isLoading, isAuthenticated, login, register, logout, loadUser } = useAuthStore();
  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    loadUser,
  };
}
