import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

// Don't import User - remove the relation for now
export enum ToolStatus {
  AVAILABLE = 'available',
  RENTED = 'rented',
  UNAVAILABLE = 'unavailable',
  PENDING = 'pending',
}

@Entity('tools')
export class Tool {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'owner_id' })
  @Index()
  ownerId: string;

  // Remove the @ManyToOne relation - just store ownerId as a string

  @Column({ length: 255 })
  @Index()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 100 })
  @Index()
  category: string;

  @Column({ name: 'price_per_day', type: 'decimal', precision: 10, scale: 0 })
  pricePerDay: number;

  @Column({ name: 'deposit', type: 'decimal', precision: 10, scale: 0, nullable: true })
  deposit?: number;

  @Column({ length: 255 })
  @Index()
  location: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  lat?: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  lng?: number;

  @Column({ type: 'text', array: true, default: '{}' })
  images: string[];

  @Column({ type: 'enum', enum: ToolStatus, default: ToolStatus.PENDING })
  @Index()
  status: ToolStatus;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  rating: number;

  @Column({ name: 'total_reviews', default: 0 })
  totalReviews: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}