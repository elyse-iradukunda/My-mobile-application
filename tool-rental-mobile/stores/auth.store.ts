import { create } from 'zustand';
import { authService } from '@/services/auth.service';
import { LoginData, RegisterData, User } from '@/types/user.types';
import { ACCESS_TOKEN_KEY, USER_KEY, getItem, removeItem, setItem } from '@/utils/storage';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  verifyPhone: (code: string) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  setUser: (user: User) => Promise<void>;
}

async function persistSession(user: User, token: string): Promise<void> {
  await setItem(ACCESS_TOKEN_KEY, token);
  await setItem(USER_KEY, JSON.stringify(user));
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  login: async (data) => {
    const { user, token } = await authService.login(data);
    await persistSession(user, token);
    set({ user, isAuthenticated: true });
  },

  register: async (data) => {
    const { user, token } = await authService.register(data);
    await persistSession(user, token);
    set({ user, isAuthenticated: true });
  },

  verifyPhone: async (code) => {
    const user = await authService.verifyPhone(code);
    await setItem(USER_KEY, JSON.stringify(user));
    set({ user });
  },

  logout: async () => {
    await removeItem(ACCESS_TOKEN_KEY);
    await removeItem(USER_KEY);
    set({ user: null, isAuthenticated: false });
  },

  loadUser: async () => {
    set({ isLoading: true });
    try {
      const [token, userJson] = await Promise.all([getItem(ACCESS_TOKEN_KEY), getItem(USER_KEY)]);
      if (token && userJson) {
        set({ user: JSON.parse(userJson) as User, isAuthenticated: true });
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } catch {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },

  setUser: async (user) => {
    await setItem(USER_KEY, JSON.stringify(user));
    set({ user });
  },
}));
