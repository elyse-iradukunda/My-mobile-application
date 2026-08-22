import { Injectable, Inject } from '@nestjs/common';
import {
  ToolServiceInterface,
  CreateToolData,
  UpdateToolData,
  SearchToolsParams,
} from './tool.service.interface';
import { Tool, ToolStatus } from '@persistence/tools/tool.entity';
import { ToolNotFoundError } from './errors/tool-not-found.error';
import { DuplicateToolError } from './errors/duplicate-tool.error';
import { ToolUnavailableError } from './errors/tool-unavailable.error';
import { InvalidToolDataError } from './errors/invalid-tool-data.error';
import { ToolRepositoryInterface } from '@persistence/tools/tool.repository.interface';

@Injectable()
export class ToolService implements ToolServiceInterface {
  constructor(
    @Inject('ToolRepositoryInterface')
    private readonly toolRepository: ToolRepositoryInterface,
  ) {}

  async create(data: CreateToolData): Promise<Tool> {
    // Validate required fields
    if (!data.ownerId) {
      throw new InvalidToolDataError('Owner ID is required');
    }
    if (!data.title || data.title.length < 3) {
      throw new InvalidToolDataError('Title must be at least 3 characters');
    }
    if (!data.category) {
      throw new InvalidToolDataError('Category is required');
    }
    if (!data.pricePerDay || data.pricePerDay <= 0) {
      throw new InvalidToolDataError('Valid price per day is required');
    }
    if (!data.location) {
      throw new InvalidToolDataError('Location is required');
    }

    // Check for duplicate tool for this owner
    const existingTools = await this.toolRepository.findByOwner(data.ownerId);
    const duplicate = existingTools.find(
      (tool) => tool.title.toLowerCase() === data.title.toLowerCase(),
    );
    if (duplicate) {
      throw new DuplicateToolError(data.title);
    }

    // Create tool entity directly
    const tool = new Tool();
    tool.ownerId = data.ownerId;
    tool.title = data.title;
    tool.description = data.description || '';
    tool.category = data.category;
    tool.pricePerDay = data.pricePerDay;
    tool.deposit = data.deposit || 0;
    tool.location = data.location;
    tool.lat = data.lat;
    tool.lng = data.lng;
    tool.images = data.images || [];
    tool.status = ToolStatus.AVAILABLE;
    tool.rating = 0;
    tool.totalReviews = 0;

    return this.toolRepository.save(tool);
  }

  async findById(id: string): Promise<Tool | null> {
    const tool = await this.toolRepository.findById(id);
    if (!tool) {
      throw new ToolNotFoundError(id);
    }
    return tool;
  }

  async findAll(params?: SearchToolsParams): Promise<Tool[]> {
    let tools = await this.toolRepository.findAll();

    if (params) {
      if (params.category) {
        tools = tools.filter((t) => t.category === params.category);
      }
      if (params.status) {
        tools = tools.filter((t) => t.status === params.status);
      }
      if (params.ownerId) {
        tools = tools.filter((t) => t.ownerId === params.ownerId);
      }
      if (params.minPrice !== undefined) {
        tools = tools.filter((t) => t.pricePerDay >= params.minPrice!);
      }
      if (params.maxPrice !== undefined) {
        tools = tools.filter((t) => t.pricePerDay <= params.maxPrice!);
      }
      if (params.search) {
        const search = params.search.toLowerCase();
        tools = tools.filter(
          (t) =>
            t.title.toLowerCase().includes(search) ||
            t.description.toLowerCase().includes(search) ||
            t.category.toLowerCase().includes(search),
        );
      }
    }

    return tools;
  }

  async findByOwner(ownerId: string): Promise<Tool[]> {
    return this.toolRepository.findByOwner(ownerId);
  }

  async update(id: string, data: UpdateToolData): Promise<Tool> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new ToolNotFoundError(id);
    }

    Object.assign(existing, data);
    existing.updatedAt = new Date();

    return this.toolRepository.update(existing);
  }

  async delete(id: string): Promise<void> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new ToolNotFoundError(id);
    }
    await this.toolRepository.delete(id);
  }

  async updateStatus(id: string, status: ToolStatus): Promise<Tool> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new ToolNotFoundError(id);
    }

    if (existing.status === status) {
      return existing;
    }

    existing.status = status;
    existing.updatedAt = new Date();

    return this.toolRepository.update(existing);
  }

  async isAvailable(toolId: string): Promise<boolean> {
    const tool = await this.findById(toolId);
    if (!tool) {
      throw new ToolNotFoundError(toolId);
    }
    return tool.status === ToolStatus.AVAILABLE;
  }

  async updateRating(toolId: string, newRating: number): Promise<Tool> {
    const tool = await this.findById(toolId);
    if (!tool) {
      throw new ToolNotFoundError(toolId);
    }

    const totalRating = tool.rating * tool.totalReviews + newRating;
    const newTotalReviews = tool.totalReviews + 1;
    const averageRating = totalRating / newTotalReviews;

    tool.rating = Math.round(averageRating * 10) / 10;
    tool.totalReviews = newTotalReviews;
    tool.updatedAt = new Date();

    return this.toolRepository.update(tool);
  }
}
