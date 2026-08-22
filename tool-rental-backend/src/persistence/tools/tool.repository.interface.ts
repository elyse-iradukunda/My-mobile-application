import { Tool } from './tool.entity';

export interface ToolRepositoryInterface {
  findById(id: string): Promise<Tool | null>;
  findAll(): Promise<Tool[]>;
  findByOwner(ownerId: string): Promise<Tool[]>;
  findByCategory(category: string): Promise<Tool[]>;
  findAvailable(): Promise<Tool[]>;
  findByIdWithOwner(id: string): Promise<Tool | null>;
  save(tool: Tool): Promise<Tool>;
  update(tool: Tool): Promise<Tool>;
  delete(id: string): Promise<void>;
  countByOwner(ownerId: string): Promise<number>;
}
