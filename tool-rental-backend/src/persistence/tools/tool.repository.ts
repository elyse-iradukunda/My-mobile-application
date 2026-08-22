import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToolRepositoryInterface } from './tool.repository.interface';
import { Tool, ToolStatus } from './tool.entity';

@Injectable()
export class ToolRepository implements ToolRepositoryInterface {
  constructor(
    @InjectRepository(Tool)
    private readonly toolRepository: Repository<Tool>,
  ) {}

  async findById(id: string): Promise<Tool | null> {
    return this.toolRepository.findOne({
      where: { id },
    });
  }

  async findByIdWithOwner(id: string): Promise<Tool | null> {
    return this.toolRepository.findOne({
      where: { id },
    });
  }

  async findAll(): Promise<Tool[]> {
    return this.toolRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findByOwner(ownerId: string): Promise<Tool[]> {
    return this.toolRepository.find({
      where: { ownerId },
      order: { createdAt: 'DESC' },
    });
  }

  async findByCategory(category: string): Promise<Tool[]> {
    return this.toolRepository.find({
      where: { category },
      order: { createdAt: 'DESC' },
    });
  }

  async findAvailable(): Promise<Tool[]> {
    return this.toolRepository.find({
      where: { status: ToolStatus.AVAILABLE },
      order: { createdAt: 'DESC' },
    });
  }

  async save(tool: Tool): Promise<Tool> {
    return this.toolRepository.save(tool);
  }

  async update(tool: Tool): Promise<Tool> {
    return this.toolRepository.save(tool);
  }

  async delete(id: string): Promise<void> {
    await this.toolRepository.delete(id);
  }

  async countByOwner(ownerId: string): Promise<number> {
    return this.toolRepository.count({ where: { ownerId } });
  }
}
