import { Test, TestingModule } from '@nestjs/testing';
import { ToolsController } from './tools.controller';
import { ToolService } from '@application/tools/tool.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { SearchToolsDto } from './dto/search-tools.dto';
import { Tool, ToolStatus } from '@persistence/tools/tool.entity';
import { AuthenticationGuard } from '@controller/common/authentication.guard';
import { ExecutionContext } from '@nestjs/common';

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
const mockUser = { id: 'user-123', fullName: 'Test User' };

// Mock AuthenticationGuard
class MockAuthenticationGuard {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    request.user = mockUser;
    return true;
  }
}

// Mock ToolService
const mockToolService = {
  create: jest.fn().mockResolvedValue(mockTool),
  findAll: jest.fn().mockResolvedValue(mockTools),
  findByOwner: jest.fn().mockResolvedValue(mockTools),
  findById: jest.fn().mockResolvedValue(mockTool),
  update: jest.fn().mockResolvedValue({ ...mockTool, title: 'Updated Tool' }),
  delete: jest.fn().mockResolvedValue(undefined),
  updateStatus: jest.fn().mockResolvedValue({ ...mockTool, status: ToolStatus.RENTED }),
  isAvailable: jest.fn().mockResolvedValue(true),
};

describe('ToolsController', () => {
  let controller: ToolsController;
  let service: typeof mockToolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToolsController],
      providers: [
        {
          provide: ToolService,
          useValue: mockToolService,
        },
      ],
    })
      .overrideGuard(AuthenticationGuard)
      .useClass(MockAuthenticationGuard)
      .compile();

    controller = module.get<ToolsController>(ToolsController);
    service = module.get(ToolService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    const createDto: CreateToolDto = {
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
      const result = await controller.create(mockUser, createDto);

      expect(result).toEqual({ success: true, data: mockTool });
      expect(service.create).toHaveBeenCalled();
    });

    it('should handle missing optional fields', async () => {
      const dtoWithoutOptional: CreateToolDto = {
        title: 'Concrete Mixer 500L',
        category: 'Construction',
        pricePerDay: 25000,
        location: 'Kigali, Rwanda',
      };

      await controller.create(mockUser, dtoWithoutOptional);

      expect(service.create).toHaveBeenCalledWith({
        ownerId: mockUser.id,
        title: dtoWithoutOptional.title,
        description: '',
        category: dtoWithoutOptional.category,
        pricePerDay: dtoWithoutOptional.pricePerDay,
        deposit: undefined,
        location: dtoWithoutOptional.location,
        lat: undefined,
        lng: undefined,
        images: [],
      });
    });
  });

  describe('findAll', () => {
    it('should return all tools', async () => {
      const result = await controller.findAll({});

      expect(result).toEqual({ success: true, data: mockTools });
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return empty array when no tools found', async () => {
      service.findAll.mockResolvedValueOnce([]);

      const result = await controller.findAll({});

      expect(result).toEqual({ success: true, data: [] });
    });
  });

  describe('findMyTools', () => {
    it('should return current user tools', async () => {
      const result = await controller.findMyTools(mockUser);

      expect(result).toEqual({ success: true, data: mockTools });
      expect(service.findByOwner).toHaveBeenCalledWith(mockUser.id);
    });

    it('should return empty array when user has no tools', async () => {
      service.findByOwner.mockResolvedValueOnce([]);

      const result = await controller.findMyTools(mockUser);

      expect(result).toEqual({ success: true, data: [] });
    });
  });

  describe('findOne', () => {
    it('should return a tool by id', async () => {
      const result = await controller.findOne(mockTool.id);

      expect(result).toEqual({ success: true, data: mockTool });
      expect(service.findById).toHaveBeenCalledWith(mockTool.id);
    });

    it('should throw error when tool not found', async () => {
      service.findById.mockRejectedValueOnce(new Error('Tool not found'));

      await expect(controller.findOne('non-existent-id')).rejects.toThrow('Tool not found');
    });
  });

  describe('update', () => {
    const updateDto: UpdateToolDto = {
      title: 'Updated Tool',
      pricePerDay: 30000,
    };

    it('should update a tool successfully', async () => {
      const updatedTool = { ...mockTool, title: 'Updated Tool' };
      service.update.mockResolvedValueOnce(updatedTool);

      const result = await controller.update(mockTool.id, updateDto);

      expect(result).toEqual({ success: true, data: updatedTool });
      expect(service.update).toHaveBeenCalledWith(mockTool.id, updateDto);
    });
  });

  describe('delete', () => {
    it('should delete a tool successfully', async () => {
      const result = await controller.delete(mockTool.id);

      expect(result).toBeUndefined();
      expect(service.delete).toHaveBeenCalledWith(mockTool.id);
    });
  });

  describe('updateStatus', () => {
    it('should update tool status successfully', async () => {
      const updatedTool = { ...mockTool, status: ToolStatus.RENTED };
      service.updateStatus.mockResolvedValueOnce(updatedTool);

      const result = await controller.updateStatus(mockTool.id, 'rented');

      expect(result).toEqual({ success: true, data: updatedTool });
      expect(service.updateStatus).toHaveBeenCalledWith(mockTool.id, 'rented');
    });
  });

  describe('checkAvailability', () => {
    it('should return true when tool is available', async () => {
      const result = await controller.checkAvailability(mockTool.id);

      expect(result).toEqual({ success: true, data: { isAvailable: true } });
      expect(service.isAvailable).toHaveBeenCalledWith(mockTool.id);
    });

    it('should return false when tool is not available', async () => {
      service.isAvailable.mockResolvedValueOnce(false);

      const result = await controller.checkAvailability(mockTool.id);

      expect(result).toEqual({ success: true, data: { isAvailable: false } });
    });
  });
});