import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { create } from 'zustand';

const USER_KEY = 'auth.user';

export interface AuthUser {
  id: string;
  phone: string;
  name?: string;
}

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  loadUser: () => Promise<void>;
  setUser: (user: AuthUser | null) => Promise<void>;
  logout: () => Promise<void>;
}

async function readUser(): Promise<string | null> {
  if (Platform.OS === 'web') {
    return globalThis.localStorage?.getItem(USER_KEY) ?? null;
  }
  return SecureStore.getItemAsync(USER_KEY);
}

async function writeUser(value: string | null): Promise<void> {
  if (Platform.OS === 'web') {
    if (value === null) {
      globalThis.localStorage?.removeItem(USER_KEY);
    } else {
      globalThis.localStorage?.setItem(USER_KEY, value);
    }
    return;
  }
  if (value === null) {
    await SecureStore.deleteItemAsync(USER_KEY);
  } else {
    await SecureStore.setItemAsync(USER_KEY, value);
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  loadUser: async () => {
    set({ isLoading: true });
    try {
      const stored = await readUser();
      set({ user: stored ? (JSON.parse(stored) as AuthUser) : null });
    } catch {
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  },
  setUser: async (user) => {
    await writeUser(user ? JSON.stringify(user) : null);
    set({ user });
  },
  logout: async () => {
    await writeUser(null);
    set({ user: null });
  },
}));
