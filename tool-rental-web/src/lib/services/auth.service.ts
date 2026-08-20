import { apiClient } from '@/lib/api-client';
import { RegisterData, LoginData, AuthResponse, User } from '@/types/user.types';

export const authService = {
  register: (data: RegisterData) =>
    apiClient.post<{ success: boolean; data: AuthResponse }>('/auth/register', data),

  login: (data: LoginData) =>
    apiClient.post<{ success: boolean; data: AuthResponse }>('/auth/login', data),

  verifyPhone: (code: string): Promise<User> =>
    apiClient.post('/auth/verify-phone', { code }).then((res) => res.data.data),

  refresh: (refreshToken: string) =>
    apiClient.post('/auth/refresh', { refreshToken }),
};
