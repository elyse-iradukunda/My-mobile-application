import { Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from './user.repository.interface';
import { User } from '@application/user/user.builder';
import { DatabaseConnection } from '@persistence/database-connection';
import { randomUUID } from 'crypto';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly db: DatabaseConnection) {}

  private mapRowToUser(row: any): User {
    if (!row) return null as any;
    return {
      id: row.id,
      phone: row.phone,
      email: row.email || undefined,
      passwordHash: row.password_hash,
      fullName: row.full_name,
      role: row.role,
      status: row.status,
      location: row.location || undefined,
      trustScore: row.trust_score ? parseFloat(row.trust_score) : 0,
      isPhoneVerified: !!row.is_phone_verified,
      isIdVerified: !!row.is_id_verified,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.db.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result[0] ? this.mapRowToUser(result[0]) : null;
  }

  async findByPhone(phone: string): Promise<User | null> {
    const result = await this.db.query(
      'SELECT * FROM users WHERE phone = $1',
      [phone]
    );
    return result[0] ? this.mapRowToUser(result[0]) : null;
  }

  async save(user: User): Promise<User> {
    const id = user.id || randomUUID();
    const now = new Date();

    const result = await this.db.query(
      `INSERT INTO users (
        id, phone, email, password_hash, full_name, role, status,
        location, trust_score, is_phone_verified, is_id_verified,
        created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *`,
      [
        id,
        user.phone,
        user.email || null,
        user.passwordHash,
        user.fullName,
        user.role,
        user.status,
        user.location || null,
        user.trustScore,
        user.isPhoneVerified,
        user.isIdVerified,
        now,
        now,
      ]
    );

    return this.mapRowToUser(result[0]);
  }

  async update(user: User): Promise<User> {
    const result = await this.db.query(
      `UPDATE users SET
        phone = $1, email = $2, password_hash = $3, full_name = $4,
        role = $5, status = $6, location = $7, trust_score = $8,
        is_phone_verified = $9, is_id_verified = $10, updated_at = $11
      WHERE id = $12 RETURNING *`,
      [
        user.phone,
        user.email || null,
        user.passwordHash,
        user.fullName,
        user.role,
        user.status,
        user.location || null,
        user.trustScore,
        user.isPhoneVerified,
        user.isIdVerified,
        new Date(),
        user.id,
      ]
    );

    return this.mapRowToUser(result[0]);
  }

  async delete(id: string): Promise<void> {
    await this.db.query('DELETE FROM users WHERE id = $1', [id]);
  }
}
