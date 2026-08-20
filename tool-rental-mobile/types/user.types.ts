export enum UserRole {
  USER = 'user',
  OWNER = 'owner',
  WORKER = 'worker',
  BUSINESS = 'business',
  ADMIN = 'admin',
}

export enum UserStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  VERIFIED = 'verified',
}

export interface User {
  id: string;
  phone: string;
  email?: string;
  fullName: string;
  role: UserRole;
  status: UserStatus;
  location?: string;
  trustScore: number;
  isPhoneVerified: boolean;
  isIdVerified: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface RegisterData {
  phone: string;
  email?: string;
  fullName: string;
  password: string;
  role?: UserRole;
}

export interface LoginData {
  phone: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
