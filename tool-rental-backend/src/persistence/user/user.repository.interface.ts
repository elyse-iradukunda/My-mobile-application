import { User } from '@application/user/user.builder';

export interface UserRepositoryInterface {
  findById(id: string): Promise<User | null>;
  findByPhone(phone: string): Promise<User | null>;
  save(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
