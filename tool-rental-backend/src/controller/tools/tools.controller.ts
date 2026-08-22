import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ToolService } from '@application/tools/tool.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { SearchToolsDto } from './dto/search-tools.dto';
import { AuthenticationGuard } from '@controller/common/authentication.guard';
import { CurrentUser } from '@controller/common/current-user.decorator';

@Controller('api/tools')
export class ToolsController {
  constructor(
    private readonly toolService: ToolService,
  ) {}

  @Post()
  @UseGuards(AuthenticationGuard)
  async create(
    @CurrentUser() user: any, // Use 'any' for now, or the User type from your auth
    @Body() dto: CreateToolDto,
  ) {
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
    return { success: true, data: tool };
  }

  @Get()
  async findAll(@Query() query: SearchToolsDto) {
    const tools = await this.toolService.findAll(query);
    return { success: true, data: tools };
  }

  @Get('my-tools')
  @UseGuards(AuthenticationGuard)
  async findMyTools(@CurrentUser() user: any) {
    const tools = await this.toolService.findByOwner(user.id);
    return { success: true, data: tools };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const tool = await this.toolService.findById(id);
    return { success: true, data: tool };
  }

  @Put(':id')
  @UseGuards(AuthenticationGuard)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateToolDto,
  ) {
    const tool = await this.toolService.update(id, dto);
    return { success: true, data: tool };
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.toolService.delete(id);
  }

  @Patch(':id/status')
  @UseGuards(AuthenticationGuard)
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    const tool = await this.toolService.updateStatus(id, status as any);
    return { success: true, data: tool };
  }

  @Get(':id/availability')
  async checkAvailability(@Param('id') id: string) {
    const isAvailable = await this.toolService.isAvailable(id);
    return { success: true, data: { isAvailable } };
  }
}