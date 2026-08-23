import { Test, TestingModule } from '@nestjs/testing';
import { ToolService } from './tool.service';
import { Tool, ToolStatus } from '@persistence/tools/tool.entity';
import { ToolNotFoundError } from './errors/tool-not-found.error';
import { DuplicateToolError } from './errors/duplicate-tool.error';
import { InvalidToolDataError } from './errors/invalid-tool-data.error';
import { ToolRepositoryInterface } from '@persistence/tools/tool.repository.interface';

// Mock data
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

// Mock repository
const mockToolRepository: jest.Mocked<ToolRepositoryInterface> = {
  findById: jest.fn(),
  findAll: jest.fn(),
  findByOwner: jest.fn(),
  findByCategory: jest.fn(),
  findAvailable: jest.fn(),
  findByIdWithOwner: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  countByOwner: jest.fn(),
};

describe('ToolService', () => {
  let service: ToolService;
  let repository: jest.Mocked<ToolRepositoryInterface>;

  beforeEach(async () => {
    mockTool.status = ToolStatus.AVAILABLE;
    mockTool.updatedAt = new Date();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolService,
        {
          provide: 'ToolRepositoryInterface',
          useValue: mockToolRepository,
        },
      ],
    }).compile();

    service = module.get<ToolService>(ToolService);
    repository = module.get('ToolRepositoryInterface');

    jest.clearAllMocks();
  });

  describe('create', () => {
    const createData = {
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
    };

    it('should create a tool successfully', async () => {
      repository.findByOwner.mockResolvedValue([]);
      repository.save.mockResolvedValue(mockTool);

      const result = await service.create(createData);

      expect(result).toEqual(mockTool);
      expect(repository.findByOwner).toHaveBeenCalledWith(createData.ownerId);
      expect(repository.save).toHaveBeenCalledWith(expect.objectContaining({
        ownerId: createData.ownerId,
        title: createData.title,
        category: createData.category,
        pricePerDay: createData.pricePerDay,
        status: ToolStatus.AVAILABLE,
      }));
    });

    it('should throw InvalidToolDataError if ownerId is missing', async () => {
      const invalidData = { ...createData, ownerId: '' };

      await expect(service.create(invalidData)).rejects.toThrow(InvalidToolDataError);
      await expect(service.create(invalidData)).rejects.toThrow('Owner ID is required');
      expect(repository.save).not.toHaveBeenCalled();
    });

    it('should throw InvalidToolDataError if title is less than 3 characters', async () => {
      const invalidData = { ...createData, title: 'Ab' };

      await expect(service.create(invalidData)).rejects.toThrow(InvalidToolDataError);
      await expect(service.create(invalidData)).rejects.toThrow('Title must be at least 3 characters');
    });

    it('should throw InvalidToolDataError if category is missing', async () => {
      const invalidData = { ...createData, category: '' };

      await expect(service.create(invalidData)).rejects.toThrow(InvalidToolDataError);
      await expect(service.create(invalidData)).rejects.toThrow('Category is required');
    });

    it('should throw InvalidToolDataError if pricePerDay is less than or equal to 0', async () => {
      const invalidData = { ...createData, pricePerDay: 0 };

      await expect(service.create(invalidData)).rejects.toThrow(InvalidToolDataError);
      await expect(service.create(invalidData)).rejects.toThrow('Valid price per day is required');
    });

    it('should throw InvalidToolDataError if location is missing', async () => {
      const invalidData = { ...createData, location: '' };

      await expect(service.create(invalidData)).rejects.toThrow(InvalidToolDataError);
      await expect(service.create(invalidData)).rejects.toThrow('Location is required');
    });

    it('should throw DuplicateToolError if tool already exists for this owner', async () => {
      repository.findByOwner.mockResolvedValue([mockTool]);

      await expect(service.create(createData)).rejects.toThrow(DuplicateToolError);
      await expect(service.create(createData)).rejects.toThrow(
        `A tool with the name "${createData.title}" already exists for this owner`
      );
      expect(repository.save).not.toHaveBeenCalled();
    });

    it('should set deposit to 0 if not provided', async () => {
      const dataWithoutDeposit = { ...createData, deposit: undefined };
      repository.findByOwner.mockResolvedValue([]);
      repository.save.mockResolvedValue({ ...mockTool, deposit: 0 });

      const result = await service.create(dataWithoutDeposit);

      expect(result.deposit).toBe(0);
    });
  });

  describe('findById', () => {
    it('should return a tool if found', async () => {
      repository.findById.mockResolvedValue(mockTool);

      const result = await service.findById(mockTool.id);

      expect(result).toEqual(mockTool);
      expect(repository.findById).toHaveBeenCalledWith(mockTool.id);
    });

    it('should throw ToolNotFoundError if tool not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findById('non-existent-id')).rejects.toThrow(ToolNotFoundError);
      await expect(service.findById('non-existent-id')).rejects.toThrow(
        `Tool not found with id non-existent-id`
      );
    });
  });

  describe('findAll', () => {
    it('should return all tools', async () => {
      repository.findAll.mockResolvedValue(mockTools);

      const result = await service.findAll();

      expect(result).toEqual(mockTools);
      expect(repository.findAll).toHaveBeenCalled();
    });

    it('should filter tools by category', async () => {
      repository.findAll.mockResolvedValue(mockTools);

      const result = await service.findAll({ category: 'Construction' });

      expect(result).toEqual(mockTools);
    });

    it('should return empty array if no tools match filters', async () => {
      repository.findAll.mockResolvedValue([]);

      const result = await service.findAll({ category: 'Non-existent' });

      expect(result).toEqual([]);
    });
  });

  describe('findByOwner', () => {
    it('should return tools for a specific owner', async () => {
      repository.findByOwner.mockResolvedValue(mockTools);

      const result = await service.findByOwner('user-123');

      expect(result).toEqual(mockTools);
      expect(repository.findByOwner).toHaveBeenCalledWith('user-123');
    });

    it('should return empty array if owner has no tools', async () => {
      repository.findByOwner.mockResolvedValue([]);

      const result = await service.findByOwner('user-456');

      expect(result).toEqual([]);
    });
  });

  describe('update', () => {
    const updateData = {
      title: 'Updated Concrete Mixer',
      pricePerDay: 30000,
    };

    it('should update a tool successfully', async () => {
      const updatedTool = { ...mockTool, ...updateData, updatedAt: new Date() };
      repository.findById.mockResolvedValue(mockTool);
      repository.update.mockResolvedValue(updatedTool);

      const result = await service.update(mockTool.id, updateData);

      expect(result).toEqual(updatedTool);
      expect(repository.findById).toHaveBeenCalledWith(mockTool.id);
      expect(repository.update).toHaveBeenCalled();
    });

    it('should throw ToolNotFoundError if tool not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.update('non-existent-id', updateData)).rejects.toThrow(ToolNotFoundError);
    });
  });

  describe('delete', () => {
    it('should delete a tool successfully', async () => {
      repository.findById.mockResolvedValue(mockTool);
      repository.delete.mockResolvedValue(undefined);

      await service.delete(mockTool.id);

      expect(repository.findById).toHaveBeenCalledWith(mockTool.id);
      expect(repository.delete).toHaveBeenCalledWith(mockTool.id);
    });

    it('should throw ToolNotFoundError if tool not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.delete('non-existent-id')).rejects.toThrow(ToolNotFoundError);
      expect(repository.delete).not.toHaveBeenCalled();
    });
  });

  describe('updateStatus', () => {
    it('should update tool status successfully', async () => {
      const updatedTool = { ...mockTool, status: ToolStatus.RENTED, updatedAt: new Date() };
      repository.findById.mockResolvedValue(mockTool);
      repository.update.mockResolvedValue(updatedTool);

      const result = await service.updateStatus(mockTool.id, ToolStatus.RENTED);

      expect(result).toEqual(updatedTool);
      expect(repository.update).toHaveBeenCalled();
    });

    it('should return the same tool if status is unchanged', async () => {
      const availableTool = { ...mockTool, status: ToolStatus.AVAILABLE };
      repository.findById.mockResolvedValue(availableTool);

      const result = await service.updateStatus(mockTool.id, ToolStatus.AVAILABLE);

      expect(result.status).toBe(ToolStatus.AVAILABLE);
      expect(result.id).toBe(mockTool.id);
      expect(repository.update).not.toHaveBeenCalled();
    });

    it('should throw ToolNotFoundError if tool not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.updateStatus('non-existent-id', ToolStatus.RENTED)).rejects.toThrow(
        ToolNotFoundError
      );
    });
  });

  describe('bulkUpdateStatus', () => {
    it('should update multiple tool statuses', async () => {
      const rentedTool = { ...mockTool, status: ToolStatus.RENTED };
      repository.findById.mockResolvedValue(mockTool);
      repository.update.mockResolvedValue(rentedTool);

      const result = await service.bulkUpdateStatus([mockTool.id], ToolStatus.RENTED);

      expect(result).toHaveLength(1);
      expect(result[0].status).toBe(ToolStatus.RENTED);
      expect(repository.update).toHaveBeenCalled();
    });
  });

  describe('bulkDelete', () => {
    it('should delete multiple tools', async () => {
      repository.findById.mockResolvedValue(mockTool);
      repository.delete.mockResolvedValue(undefined);

      await service.bulkDelete([mockTool.id]);

      expect(repository.delete).toHaveBeenCalledWith(mockTool.id);
    });
  });

  describe('isAvailable', () => {
    it('should return true if tool is available', async () => {
      const availableTool = { ...mockTool, status: ToolStatus.AVAILABLE };
      repository.findById.mockResolvedValue(availableTool);

      const result = await service.isAvailable(mockTool.id);

      expect(result).toBe(true);
      expect(repository.findById).toHaveBeenCalledWith(mockTool.id);
    });

    it('should return false if tool is not available', async () => {
      const unavailableTool = { ...mockTool, status: ToolStatus.RENTED };
      repository.findById.mockResolvedValue(unavailableTool);

      const result = await service.isAvailable(mockTool.id);

      expect(result).toBe(false);
      expect(repository.findById).toHaveBeenCalledWith(mockTool.id);
    });

    it('should throw ToolNotFoundError if tool not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.isAvailable('non-existent-id')).rejects.toThrow(ToolNotFoundError);
      expect(repository.findById).toHaveBeenCalledWith('non-existent-id');
    });
  });

  describe('updateRating', () => {
    it('should update tool rating successfully', async () => {
      const toolWithRating = { ...mockTool, rating: 4.5, totalReviews: 10 };
      const updatedTool = { 
        ...toolWithRating, 
        rating: 4.6, 
        totalReviews: 11, 
        updatedAt: new Date() 
      };
      
      repository.findById.mockResolvedValue(toolWithRating);
      repository.update.mockResolvedValue(updatedTool);

      const result = await service.updateRating(mockTool.id, 5);

      expect(result).toEqual(updatedTool);
      expect(repository.update).toHaveBeenCalled();
    });

    it('should handle first review', async () => {
      const toolWithNoReviews = { ...mockTool, rating: 0, totalReviews: 0 };
      const updatedTool = { 
        ...toolWithNoReviews, 
        rating: 4.5, 
        totalReviews: 1, 
        updatedAt: new Date() 
      };
      
      repository.findById.mockResolvedValue(toolWithNoReviews);
      repository.update.mockResolvedValue(updatedTool);

      const result = await service.updateRating(mockTool.id, 4.5);

      expect(result.rating).toBe(4.5);
      expect(result.totalReviews).toBe(1);
    });

    it('should throw ToolNotFoundError if tool not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.updateRating('non-existent-id', 5)).rejects.toThrow(ToolNotFoundError);
    });
  });
});