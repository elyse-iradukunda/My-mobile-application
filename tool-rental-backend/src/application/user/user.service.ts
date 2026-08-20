import { Injectable, Inject } from '@nestjs/common';
import { UserServiceInterface } from './user.service.interface';
import { UserRepositoryInterface } from '@persistence/user/user.repository.interface';
import { User, UserBuilder } from './user.builder';
import { UserNotFoundError } from './errors/user-not-found.error';
import { DuplicatePhoneError } from './errors/duplicate-phone.error';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundError(id);
    }
    return user;
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.userRepository.findByPhone(phone);
  }

  async create(userData: Partial<User>): Promise<User> {
    // Check if phone already exists
    const existing = await this.userRepository.findByPhone(userData.phone!);
    if (existing) {
      throw new DuplicatePhoneError(userData.phone!);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(userData.passwordHash!, salt);

    const user = new UserBuilder()
      .withPhone(userData.phone!)
      .withEmail(userData.email!)
      .withFullName(userData.fullName!)
      .withPasswordHash(passwordHash)
      .withRole(userData.role!)
      .build();

    return this.userRepository.save(user);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new UserNotFoundError(id);
    }

    const updated = { ...existing, ...data, updatedAt: new Date() };
    return this.userRepository.update(updated);
  }

  async delete(id: string): Promise<void> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new UserNotFoundError(id);
    }
    await this.userRepository.delete(id);
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash);
  }
}
