import { IsString, IsNumber, IsOptional, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ToolStatus } from '@persistence/tools/tool.entity';

export class SearchToolsDto {
  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  lat?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  lng?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  radius?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  minPrice?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  maxPrice?: number;

  @IsEnum(ToolStatus)
  @IsOptional()
  status?: ToolStatus;

  @IsString()
  @IsOptional()
  search?: string;
}
