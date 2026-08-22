import { Tool } from '@persistence/tools/tool.entity';
import { ToolStatus } from '@persistence/tools/tool.entity';

export interface CreateToolData {
  ownerId: string;
  title: string;
  description: string;
  category: string;
  pricePerDay: number;
  deposit?: number;
  location: string;
  lat?: number;
  lng?: number;
  images?: string[];
}

export interface UpdateToolData {
  title?: string;
  description?: string;
  category?: string;
  pricePerDay?: number;
  deposit?: number;
  location?: string;
  lat?: number;
  lng?: number;
  images?: string[];
  status?: ToolStatus;
}

export interface SearchToolsParams {
  category?: string;
  location?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  minPrice?: number;
  maxPrice?: number;
  status?: ToolStatus;
  ownerId?: string;
  search?: string;
}

export interface ToolServiceInterface {
  create(data: CreateToolData): Promise<Tool>;
  findById(id: string): Promise<Tool | null>;
  findAll(params?: SearchToolsParams): Promise<Tool[]>;
  findByOwner(ownerId: string): Promise<Tool[]>;
  update(id: string, data: UpdateToolData): Promise<Tool>;
  delete(id: string): Promise<void>;
  updateStatus(id: string, status: ToolStatus): Promise<Tool>;
  isAvailable(toolId: string): Promise<boolean>;
}
