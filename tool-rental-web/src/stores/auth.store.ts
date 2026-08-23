// stores/auth.store.ts
import { create } from 'zustand';
import { authService } from '@/lib/services/auth.service';
import { RegisterData, User } from '@/types/user.types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  loadUser: () => Promise<void>;
  login: (phone: string, password: string) => Promise<User>;
  register: (data: RegisterData) => Promise<User>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  loadUser: async () => {
    try {
      const userJson = localStorage.getItem('user');
      const token = localStorage.getItem('access_token');

      if (userJson && token) {
        const user = JSON.parse(userJson) as User;
        set({ user, isAuthenticated: true, isLoading: false });
        return;
      }

      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  login: async (phone: string, password: string) => {
    const response = await authService.login({ phone, password });
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('access_token', response.token);
    set({ user: response.user, isAuthenticated: true, isLoading: false });
    return response.user;
  },

  register: async (data: RegisterData) => {
    const response = await authService.register(data);
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('access_token', response.token);
    set({ user: response.user, isAuthenticated: true, isLoading: false });
    return response.user;
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    set({ user: null, isAuthenticated: false, isLoading: false });
  },

  setUser: (user: User) => {
    set({ user, isAuthenticated: true, isLoading: false });
  },
}));