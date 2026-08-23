import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ToolService } from '@application/tools/tool.service';

import { AuthenticationGuard } from '@controller/common/authentication.guard';
import { CurrentUser } from '@controller/common/current-user.decorator';

import { CreateToolDto } from './dto/create-tool.dto';
import { SearchToolsDto } from './dto/search-tools.dto';
import { UpdateToolDto } from './dto/update-tool.dto';

@Controller('api/tools')
export class ToolsController {
  constructor(private readonly toolService: ToolService) {}

  // ============================================================
  // CREATE
  // ============================================================

  @Post()
  @UseGuards(AuthenticationGuard)
  async create(@CurrentUser() user: any, @Body() dto: CreateToolDto) {
    const tool = await this.toolService.create({
      ownerId: user.id,
      title: dto.title,
      description: dto.description || '',
      category: dto.category,
      pricePerDay: dto.pricePerDay,
      deposit: dto.deposit,
      location: dto.location,
      lat: dto.lat,
      lng: dto.lng,
      images: dto.images || [],
    });

    return {
      success: true,
      data: tool,
    };
  }

  // ============================================================
  // READ - ALL TOOLS
  // ============================================================

  @Get()
  async findAll(@Query() query: SearchToolsDto) {
    const tools = await this.toolService.findAll(query);

    return {
      success: true,
      data: tools,
    };
  }

  // ============================================================
  // READ - SPECIAL / FILTERED DATA
  // ============================================================

  @Get('with-owner')
  async findAllWithOwner(@Query() query: SearchToolsDto) {
    const tools = await this.toolService.findToolsWithOwner(query);

    return {
      success: true,
      data: tools,
    };
  }

  @Get('categories/stats')
  async getCategoryStats() {
    const stats = await this.toolService.getCategoryStats();

    return {
      success: true,
      data: stats,
    };
  }

  @Get('categories')
  async getCategories() {
    const tools = await this.toolService.findAll();

    const categories = [...new Set(tools.map((tool) => tool.category))];

    return {
      success: true,
      data: categories,
    };
  }

  @Get('featured')
  async getFeaturedTools(@Query('limit') limit?: string) {
    const tools = await this.toolService.findAll();

    const parsedLimit = limit ? parseInt(limit, 10) : 6;

    const featured = tools
      .filter((tool) => tool.status === 'available')
      .sort((a, b) => b.rating - a.rating)
      .slice(0, parsedLimit);

    return {
      success: true,
      data: featured,
    };
  }

  // ============================================================
  // READ - AUTHENTICATED USER
  // ============================================================

  @Get('my-tools')
  @UseGuards(AuthenticationGuard)
  async findMyTools(@CurrentUser() user: any) {
    const tools = await this.toolService.findByOwner(user.id);

    return {
      success: true,
      data: tools,
    };
  }

  // ============================================================
  // DASHBOARD STATS
  // ============================================================

  @Get('stats')
  @UseGuards(AuthenticationGuard)
  async getToolStats(@CurrentUser() user: any) {
    const allTools = await this.toolService.findAll();
    const myTools = await this.toolService.findByOwner(user.id);

    const stats = {
      total: allTools.length,

      available: allTools.filter((tool) => tool.status === 'available').length,

      rented: allTools.filter((tool) => tool.status === 'rented').length,

      myTotal: myTools.length,

      myAvailable: myTools.filter((tool) => tool.status === 'available').length,

      myRented: myTools.filter((tool) => tool.status === 'rented').length,
    };

    return {
      success: true,
      data: stats,
    };
  }

  // ============================================================
  // READ - SINGLE TOOL
  // ============================================================

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const tool = await this.toolService.findById(id);

    return {
      success: true,
      data: tool,
    };
  }

  // ============================================================
  // UPDATE
  // ============================================================

  @Put(':id')
  @UseGuards(AuthenticationGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateToolDto) {
    const tool = await this.toolService.update(id, dto);

    return {
      success: true,
      data: tool,
    };
  }

  @Patch(':id/status')
  @UseGuards(AuthenticationGuard)
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    const tool = await this.toolService.updateStatus(id, status as any);

    return {
      success: true,
      data: tool,
    };
  }

  @Patch('bulk/status')
  @UseGuards(AuthenticationGuard)
  async bulkUpdateStatus(
    @Body('toolIds') toolIds: string[],
    @Body('status') status: string,
  ) {
    const tools = await this.toolService.bulkUpdateStatus(toolIds, status as any);

    return {
      success: true,
      data: tools,
    };
  }

  // ============================================================
  // AVAILABILITY
  // ============================================================

  @Get(':id/availability')
  async checkAvailability(@Param('id') id: string) {
    const isAvailable = await this.toolService.isAvailable(id);

    return {
      success: true,
      data: {
        isAvailable,
      },
    };
  }

  // ============================================================
  // DELETE
  // ============================================================

  @Delete(':id')
  @UseGuards(AuthenticationGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.toolService.delete(id);
  }

  @Delete('bulk')
  @UseGuards(AuthenticationGuard)
  async bulkDelete(@Body('toolIds') toolIds: string[]) {
    await this.toolService.bulkDelete(toolIds);

    return {
      success: true,
      data: {
        deletedCount: toolIds?.length ?? 0,
      },
    };
  }
}
