import { User } from './user.types';

export enum ToolCategory {
  CONSTRUCTION = 'Construction',
  AGRICULTURE = 'Agriculture',
  PHOTOGRAPHY = 'Photography',
  EVENTS = 'Events',
  MUSIC = 'Music',
  ELECTRONICS = 'Electronics',
  TRANSPORTATION = 'Transportation',
  HOUSE_SERVICES = 'House Services',
}

export enum ToolStatus {
  AVAILABLE = 'available',
  RENTED = 'rented',
  MAINTENANCE = 'maintenance',
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory | string;
  dailyRate: number;
  hourlyRate?: number;
  images: string[];
  ownerId: string;
  owner?: User;
  location: string;
  status: ToolStatus | string;
  depositAmount?: number;
  isAvailable?: boolean;
  specifications?: Record<string, any>;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ToolSearchParams {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  status?: string;
  page?: number;
  limit?: number;
}
