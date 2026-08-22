import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { ToolRepository } from './tool.repository';
import { Tool, ToolStatus } from './tool.entity';

// Mock data - removed 'owner' property
const mockTool: Tool = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  ownerId: 'user-123',
  title: 'Concrete Mixer 500L',
  description: 'Heavy-duty concrete mixer',
  category: 'Construction',
  pricePerDay: 25000,
  deposit: 50000,
  location: 'Kigali, Rwanda',
  lat: -1.9441,
  lng: 30.0619,
  images: ['image1.jpg'],
  status: ToolStatus.AVAILABLE,
  rating: 0,
  totalReviews: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockTools: Tool[] = [mockTool];

// Mock DeleteResult
const mockDeleteResult: DeleteResult = {
  raw: {},
  affected: 1,
};

const mockDeleteResultZero: DeleteResult = {
  raw: {},
  affected: 0,
};

// Mock Repository
const mockRepository = {
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  delete: jest.fn().mockResolvedValue(mockDeleteResult),
  count: jest.fn(),
};

describe('ToolRepository', () => {
  let repository: ToolRepository;
  let typeOrmRepository: jest.Mocked<Repository<Tool>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolRepository,
        {
          provide: getRepositoryToken(Tool),
          useValue: mockRepository,
        },
      ],
    }).compile();

    repository = module.get<ToolRepository>(ToolRepository);
    typeOrmRepository = module.get(getRepositoryToken(Tool));

    jest.clearAllMocks();
  });

  describe('findById', () => {
    it('should return a tool when found', async () => {
      typeOrmRepository.findOne.mockResolvedValue(mockTool);

      const result = await repository.findById(mockTool.id);

      expect(result).toEqual(mockTool);
      expect(typeOrmRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockTool.id },
      });
    });

    it('should return null when tool not found', async () => {
      typeOrmRepository.findOne.mockResolvedValue(null);

      const result = await repository.findById('non-existent-id');

      expect(result).toBeNull();
      expect(typeOrmRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'non-existent-id' },
      });
    });
  });

  describe('findByIdWithOwner', () => {
    it('should return a tool with owner when found', async () => {
      typeOrmRepository.findOne.mockResolvedValue(mockTool);

      const result = await repository.findByIdWithOwner(mockTool.id);

      expect(result).toEqual(mockTool);
      expect(typeOrmRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockTool.id },
      });
    });

    it('should return null when tool not found', async () => {
      typeOrmRepository.findOne.mockResolvedValue(null);

      const result = await repository.findByIdWithOwner('non-existent-id');

      expect(result).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return all tools ordered by createdAt DESC', async () => {
      typeOrmRepository.find.mockResolvedValue(mockTools);

      const result = await repository.findAll();

      expect(result).toEqual(mockTools);
      expect(typeOrmRepository.find).toHaveBeenCalledWith({
        order: { createdAt: 'DESC' },
      });
    });

    it('should return empty array when no tools exist', async () => {
      typeOrmRepository.find.mockResolvedValue([]);

      const result = await repository.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findByOwner', () => {
    it('should return tools for a specific owner', async () => {
      typeOrmRepository.find.mockResolvedValue(mockTools);

      const result = await repository.findByOwner('user-123');

      expect(result).toEqual(mockTools);
      expect(typeOrmRepository.find).toHaveBeenCalledWith({
        where: { ownerId: 'user-123' },
        order: { createdAt: 'DESC' },
      });
    });

    it('should return empty array when owner has no tools', async () => {
      typeOrmRepository.find.mockResolvedValue([]);

      const result = await repository.findByOwner('user-456');

      expect(result).toEqual([]);
    });
  });

  describe('findByCategory', () => {
    it('should return tools by category', async () => {
      typeOrmRepository.find.mockResolvedValue(mockTools);

      const result = await repository.findByCategory('Construction');

      expect(result).toEqual(mockTools);
      expect(typeOrmRepository.find).toHaveBeenCalledWith({
        where: { category: 'Construction' },
        order: { createdAt: 'DESC' },
      });
    });

    it('should return empty array when category has no tools', async () => {
      typeOrmRepository.find.mockResolvedValue([]);

      const result = await repository.findByCategory('Non-existent');

      expect(result).toEqual([]);
    });
  });

  describe('findAvailable', () => {
    it('should return available tools', async () => {
      typeOrmRepository.find.mockResolvedValue(mockTools);

      const result = await repository.findAvailable();

      expect(result).toEqual(mockTools);
      expect(typeOrmRepository.find).toHaveBeenCalledWith({
        where: { status: ToolStatus.AVAILABLE },
        order: { createdAt: 'DESC' },
      });
    });

    it('should return empty array when no tools available', async () => {
      typeOrmRepository.find.mockResolvedValue([]);

      const result = await repository.findAvailable();

      expect(result).toEqual([]);
    });
  });

  describe('save', () => {
    it('should save a new tool', async () => {
      const newTool = { ...mockTool, id: undefined } as Partial<Tool>;
      const savedTool = { ...mockTool, id: 'new-id' };
      typeOrmRepository.save.mockResolvedValue(savedTool);

      const result = await repository.save(newTool as Tool);

      expect(result).toEqual(savedTool);
      expect(typeOrmRepository.save).toHaveBeenCalledWith(newTool);
    });

    it('should update an existing tool', async () => {
      const updatedTool = { ...mockTool, title: 'Updated Title' };
      typeOrmRepository.save.mockResolvedValue(updatedTool);

      const result = await repository.save(updatedTool);

      expect(result).toEqual(updatedTool);
      expect(typeOrmRepository.save).toHaveBeenCalledWith(updatedTool);
    });
  });

  describe('update', () => {
    it('should update a tool', async () => {
      const updatedTool = { ...mockTool, title: 'Updated Title' };
      typeOrmRepository.save.mockResolvedValue(updatedTool);

      const result = await repository.update(updatedTool);

      expect(result).toEqual(updatedTool);
      expect(typeOrmRepository.save).toHaveBeenCalledWith(updatedTool);
    });
  });

  describe('delete', () => {
    it('should delete a tool by id', async () => {
      typeOrmRepository.delete.mockResolvedValue(mockDeleteResult);

      await repository.delete(mockTool.id);

      expect(typeOrmRepository.delete).toHaveBeenCalledWith(mockTool.id);
    });

    it('should handle deletion of non-existent tool', async () => {
      typeOrmRepository.delete.mockResolvedValue(mockDeleteResultZero);

      await repository.delete('non-existent-id');

      expect(typeOrmRepository.delete).toHaveBeenCalledWith('non-existent-id');
    });
  });

  describe('countByOwner', () => {
    it('should return count of tools for an owner', async () => {
      typeOrmRepository.count.mockResolvedValue(5);

      const result = await repository.countByOwner('user-123');

      expect(result).toBe(5);
      expect(typeOrmRepository.count).toHaveBeenCalledWith({
        where: { ownerId: 'user-123' },
      });
    });

    it('should return 0 when owner has no tools', async () => {
      typeOrmRepository.count.mockResolvedValue(0);

      const result = await repository.countByOwner('user-456');

      expect(result).toBe(0);
    });
  });
});