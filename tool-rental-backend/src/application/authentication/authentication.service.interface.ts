import { User } from '@application/user/user.builder';

export interface AuthenticationServiceInterface {
  register(data: RegisterData): Promise<{ user: User; token: string }>;
  login(phone: string, password: string): Promise<{ user: User; token: string }>;
  verifyPhone(userId: string, code: string): Promise<User>;
  refreshToken(refreshToken: string): Promise<{ token: string }>;
}

export interface RegisterData {
  phone: string;
  email?: string;
  fullName: string;
  password: string;
  role?: string;
}
