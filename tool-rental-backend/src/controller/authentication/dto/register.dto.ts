import { IsString, IsPhoneNumber, IsEmail, IsOptional, MinLength } from 'class-validator';

export class RegisterDto {
  @IsPhoneNumber('RW')
  phone: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  fullName: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  role?: string;
}
