import { Tool } from './tool.types';
import { User } from './user.types';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface Booking {
  id: string;
  toolId: string;
  tool?: Tool;
  renterId: string;
  renter?: User;
  startDate: Date | string;
  endDate: Date | string;
  totalPrice: number;
  status: BookingStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
}
