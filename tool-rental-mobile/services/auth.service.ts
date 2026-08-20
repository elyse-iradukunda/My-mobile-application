import { apiClient } from '@/services/api-client';
import { AuthResponse, LoginData, RegisterData, User } from '@/types/user.types';

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

export const authService = {
  register: (data: RegisterData): Promise<AuthResponse> =>
    apiClient
      .post<ApiEnvelope<AuthResponse>>('/auth/register', data)
      .then((res) => res.data.data),

  login: (data: LoginData): Promise<AuthResponse> =>
    apiClient.post<ApiEnvelope<AuthResponse>>('/auth/login', data).then((res) => res.data.data),

  verifyPhone: (code: string): Promise<User> =>
    apiClient.post<ApiEnvelope<User>>('/auth/verify-phone', { code }).then((res) => res.data.data),
};
