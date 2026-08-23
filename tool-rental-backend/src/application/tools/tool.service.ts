import { Inject, Injectable } from '@nestjs/common';

import { Tool, ToolStatus } from '@persistence/tools/tool.entity';
import { ToolRepositoryInterface } from '@persistence/tools/tool.repository.interface';

import {
  CreateToolData,
  SearchToolsParams,
  ToolServiceInterface,
  UpdateToolData,
} from './tool.service.interface';

import { DuplicateToolError } from './errors/duplicate-tool.error';
import { InvalidToolDataError } from './errors/invalid-tool-data.error';
import { ToolNotFoundError } from './errors/tool-not-found.error';

@Injectable()
export class ToolService implements ToolServiceInterface {
  constructor(
    @Inject('ToolRepositoryInterface')
    private readonly toolRepository: ToolRepositoryInterface,
  ) {}

  // ============================================================
  // CREATE
  // ============================================================

  async create(data: CreateToolData): Promise<Tool> {
    this.validateCreateData(data);

    const existingTools = await this.toolRepository.findByOwner(data.ownerId);

    const duplicate = existingTools.find(
      (tool) => tool.title.toLowerCase() === data.title.toLowerCase(),
    );

    if (duplicate) {
      throw new DuplicateToolError(data.title);
    }

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

  // ============================================================
  // READ
  // ============================================================

  async findById(id: string): Promise<Tool> {
    const tool = await this.toolRepository.findById(id);

    if (!tool) {
      throw new ToolNotFoundError(id);
    }

    return tool;
  }

  async findAll(params?: SearchToolsParams): Promise<Tool[]> {
    const tools = await this.toolRepository.findAll();

    return this.filterTools(tools, params);
  }

  async findByOwner(ownerId: string): Promise<Tool[]> {
    return this.toolRepository.findByOwner(ownerId);
  }

  async findToolsWithOwner(params?: SearchToolsParams): Promise<Tool[]> {
    const tools = await this.toolRepository.findAll();

    return this.filterTools(tools, params);
  }

  // ============================================================
  // UPDATE
  // ============================================================

  async update(id: string, data: UpdateToolData): Promise<Tool> {
    const existing = await this.findById(id);

    Object.assign(existing, data);
    existing.updatedAt = new Date();

    return this.toolRepository.update(existing);
  }

  async updateStatus(id: string, status: ToolStatus): Promise<Tool> {
    const existing = await this.findById(id);

    if (existing.status === status) {
      return existing;
    }

    existing.status = status;
    existing.updatedAt = new Date();

    return this.toolRepository.update(existing);
  }

  async bulkUpdateStatus(toolIds: string[], status: ToolStatus): Promise<Tool[]> {
    if (!toolIds?.length) {
      return [];
    }

    const updatedTools: Tool[] = [];

    for (const toolId of toolIds) {
      const existingTool = await this.findById(toolId);

      if (existingTool.status === status) {
        updatedTools.push(existingTool);
        continue;
      }

      existingTool.status = status;
      existingTool.updatedAt = new Date();

      const updatedTool = await this.toolRepository.update(existingTool);
      updatedTools.push(updatedTool);
    }

    return updatedTools;
  }

  async bulkDelete(toolIds: string[]): Promise<void> {
    if (!toolIds?.length) {
      return;
    }

    for (const toolId of toolIds) {
      await this.delete(toolId);
    }
  }

  async updateRating(toolId: string, newRating: number): Promise<Tool> {
    const tool = await this.findById(toolId);

    const totalRating = tool.rating * tool.totalReviews + newRating;
    const newTotalReviews = tool.totalReviews + 1;
    const averageRating = totalRating / newTotalReviews;

    tool.rating = Math.round(averageRating * 10) / 10;
    tool.totalReviews = newTotalReviews;
    tool.updatedAt = new Date();

    return this.toolRepository.update(tool);
  }

  // ============================================================
  // DELETE
  // ============================================================

  async delete(id: string): Promise<void> {
    await this.findById(id);

    await this.toolRepository.delete(id);
  }

  // ============================================================
  // STATUS / AVAILABILITY
  // ============================================================

  async isAvailable(toolId: string): Promise<boolean> {
    const tool = await this.findById(toolId);

    return tool.status === ToolStatus.AVAILABLE;
  }

  // ============================================================
  // STATISTICS
  // ============================================================

  async getCategoryStats(): Promise<
    { category: string; count: number }[]
  > {
    const tools = await this.toolRepository.findAll();

    const stats: Record<string, number> = {};

    tools.forEach((tool) => {
      stats[tool.category] = (stats[tool.category] || 0) + 1;
    });

    return Object.entries(stats).map(([category, count]) => ({
      category,
      count,
    }));
  }

  // ============================================================
  // PRIVATE HELPERS
  // ============================================================

  private validateCreateData(data: CreateToolData): void {
    if (!data.ownerId) {
      throw new InvalidToolDataError('Owner ID is required');
    }

    if (!data.title || data.title.length < 3) {
      throw new InvalidToolDataError(
        'Title must be at least 3 characters',
      );
    }

    if (!data.category) {
      throw new InvalidToolDataError('Category is required');
    }

    if (!data.pricePerDay || data.pricePerDay <= 0) {
      throw new InvalidToolDataError(
        'Valid price per day is required',
      );
    }

    if (!data.location) {
      throw new InvalidToolDataError('Location is required');
    }
  }

  private filterTools(
    tools: Tool[],
    params?: SearchToolsParams,
  ): Tool[] {
    if (!params) {
      return tools;
    }

    let filteredTools = tools;

    if (params.category) {
      filteredTools = filteredTools.filter(
        (tool) => tool.category === params.category,
      );
    }

    if (params.status) {
      filteredTools = filteredTools.filter(
        (tool) => tool.status === params.status,
      );
    }

    if (params.ownerId) {
      filteredTools = filteredTools.filter(
        (tool) => tool.ownerId === params.ownerId,
      );
    }

    const minPrice = params.minPrice;
    if (minPrice !== undefined && minPrice !== null) {
      filteredTools = filteredTools.filter(
        (tool) => tool.pricePerDay >= minPrice,
      );
    }

    const maxPrice = params.maxPrice;
    if (maxPrice !== undefined && maxPrice !== null) {
      filteredTools = filteredTools.filter(
        (tool) => tool.pricePerDay <= maxPrice,
      );
    }

    if (params.search) {
      const search = params.search.toLowerCase();

      filteredTools = filteredTools.filter(
        (tool) =>
          tool.title.toLowerCase().includes(search) ||
          tool.description.toLowerCase().includes(search) ||
          tool.category.toLowerCase().includes(search),
      );
    }

    return filteredTools;
  }
}