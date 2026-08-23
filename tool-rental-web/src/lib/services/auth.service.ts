// lib/services/auth.service.ts
import { apiClient } from '@/lib/api-client';
import { User } from '@/types/user.types';

export interface LoginData {
  phone: string;
  password: string;
}

export interface RegisterData {
  phone: string;
  fullName: string;
  password: string;
  email?: string;
  role?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await apiClient.post<{ success: boolean; data: AuthResponse }>(
      '/auth/login',
      data
    );
    return response.data.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post<{ success: boolean; data: AuthResponse }>(
      '/auth/register',
      data
    );
    return response.data.data;
  },

  verifyPhone: async (code: string): Promise<User> => {
    const response = await apiClient.post<{ success: boolean; data: User }>(
      '/auth/verify-phone',
      { code }
    );
    return response.data.data;
  },

  refresh: async (refreshToken: string): Promise<{ token: string }> => {
    const response = await apiClient.post<{ success: boolean; data: { token: string } }>(
      '/auth/refresh',
      { refreshToken }
    );
    return response.data.data;
  },
};