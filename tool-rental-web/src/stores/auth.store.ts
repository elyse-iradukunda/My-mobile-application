import { create } from 'zustand';
import { User, AuthResponse, RegisterData, LoginData } from '@/types/user.types';
import { apiClient } from '@/lib/api-client';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (phone: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  login: async (phone: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await apiClient.post<{ success: boolean; data: AuthResponse }>(
        '/auth/login',
        { phone, password }
      );
      const { user, token } = response.data.data;

      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        document.cookie = `access_token=${token}; path=/; max-age=604800; SameSite=Lax`;
      }

      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (data: RegisterData) => {
    set({ isLoading: true });
    try {
      const response = await apiClient.post<{ success: boolean; data: AuthResponse }>(
        '/auth/register',
        data
      );
      const { user, token } = response.data.data;

      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        document.cookie = `access_token=${token}; path=/; max-age=604800; SameSite=Lax`;
      }

      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
    set({ user: null, isAuthenticated: false });
  },

  loadUser: async () => {
    if (typeof window === 'undefined') {
      set({ isLoading: false });
      return;
    }
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        set({ user, isAuthenticated: true, isLoading: false });
      } catch {
        set({ isLoading: false });
      }
    } else {
      set({ isLoading: false });
    }
  },

  setUser: (user: User) => {
    set({ user });
  },
}));
