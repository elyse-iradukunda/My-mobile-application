import { IsString, IsNumber, IsOptional, Min, IsArray, IsUrl, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ToolStatus } from '@persistence/tools/tool.entity';

export class UpdateToolDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsNumber()
  @IsOptional()
  @Min(1, { message: 'Price must be greater than 0' })
  @Type(() => Number)
  pricePerDay?: number;

  @IsNumber()
  @IsOptional()
  @Min(0, { message: 'Deposit cannot be negative' })
  @Type(() => Number)
  deposit?: number;

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

  @IsArray()
  @IsOptional()
  @IsUrl({}, { each: true, message: 'Each image must be a valid URL' })
  images?: string[];

  @IsEnum(ToolStatus)
  @IsOptional()
  status?: ToolStatus;
}