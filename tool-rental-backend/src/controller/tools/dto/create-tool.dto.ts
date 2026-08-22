import { IsString, IsNumber, IsOptional, Min, IsArray, IsUrl, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateToolDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty({ message: 'Category is required' })
  category: string;

  @IsNumber()
  @Min(1, { message: 'Price must be greater than 0' })
  @Type(() => Number)
  pricePerDay: number;

  @IsNumber()
  @IsOptional()
  @Min(0, { message: 'Deposit cannot be negative' })
  @Type(() => Number)
  deposit?: number;

  @IsString()
  @IsNotEmpty({ message: 'Location is required' })
  location: string;

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
}