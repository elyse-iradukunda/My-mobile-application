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
  passwordHash: string;
  fullName: string;
  role: UserRole;
  status: UserStatus;
  location?: string;
  trustScore: number;
  isPhoneVerified: boolean;
  isIdVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class UserBuilder {
  private user: Partial<User> = {
    role: UserRole.USER,
    status: UserStatus.PENDING,
    trustScore: 0,
    isPhoneVerified: false,
    isIdVerified: false,
  };

  withId(id: string): UserBuilder {
    this.user.id = id;
    return this;
  }

  withPhone(phone: string): UserBuilder {
    this.user.phone = phone;
    return this;
  }

  withEmail(email: string): UserBuilder {
    this.user.email = email;
    return this;
  }

  withPasswordHash(hash: string): UserBuilder {
    this.user.passwordHash = hash;
    return this;
  }

  withFullName(name: string): UserBuilder {
    this.user.fullName = name;
    return this;
  }

  withRole(role: UserRole): UserBuilder {
    this.user.role = role;
    return this;
  }

  withStatus(status: UserStatus): UserBuilder {
    this.user.status = status;
    return this;
  }

  withLocation(location: string): UserBuilder {
    this.user.location = location;
    return this;
  }

  withTrustScore(score: number): UserBuilder {
    this.user.trustScore = score;
    return this;
  }

  withPhoneVerified(verified: boolean): UserBuilder {
    this.user.isPhoneVerified = verified;
    return this;
  }

  withIdVerified(verified: boolean): UserBuilder {
    this.user.isIdVerified = verified;
    return this;
  }

  build(): User {
    const now = new Date();
    return {
      id: this.user.id!,
      phone: this.user.phone!,
      email: this.user.email,
      passwordHash: this.user.passwordHash!,
      fullName: this.user.fullName!,
      role: this.user.role || UserRole.USER,
      status: this.user.status || UserStatus.PENDING,
      location: this.user.location,
      trustScore: this.user.trustScore || 0,
      isPhoneVerified: this.user.isPhoneVerified || false,
      isIdVerified: this.user.isIdVerified || false,
      createdAt: now,
      updatedAt: now,
    };
  }
}
