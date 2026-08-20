import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationServiceInterface, RegisterData } from './authentication.service.interface';
import { UserService } from '@application/user/user.service';
import { User, UserRole } from '@application/user/user.builder';
import { InvalidCredentialsError } from './errors/invalid-credentials.error';
import { UserNotFoundError } from '@application/user/errors/user-not-found.error';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthenticationService implements AuthenticationServiceInterface {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    const user = await this.userService.create({
      phone: data.phone,
      email: data.email,
      fullName: data.fullName,
      passwordHash: data.password,
      role: data.role as UserRole || UserRole.USER,
    });

    const token = this.generateToken(user);

    return { user, token };
  }

  async login(phone: string, password: string): Promise<{ user: User; token: string }> {
    const user = await this.userService.findByPhone(phone);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isValid = await this.userService.validatePassword(user, password);
    if (!isValid) {
      throw new InvalidCredentialsError();
    }

    const token = this.generateToken(user);

    return { user, token };
  }

  async verifyPhone(userId: string, code: string): Promise<User> {
    // TODO: Implement actual SMS verification
    // For now, just verify if code is '1234'
    if (code !== '1234') {
      throw new Error('Invalid verification code');
    }

    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UserNotFoundError(userId);
    }

    return this.userService.update(userId, { isPhoneVerified: true });
  }

  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    // TODO: Implement refresh token logic
    const payload = this.jwtService.verify(refreshToken);
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new Error('Invalid refresh token');
    }

    return { token: this.generateToken(user) };
  }

  private generateToken(user: User): string {
    const payload = {
      sub: user.id,
      phone: user.phone,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }
}
