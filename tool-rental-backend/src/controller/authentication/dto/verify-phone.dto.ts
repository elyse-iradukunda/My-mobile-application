import { IsString, MinLength } from 'class-validator';

export class VerifyPhoneDto {
  @IsString()
  @MinLength(4)
  code: string;
}
