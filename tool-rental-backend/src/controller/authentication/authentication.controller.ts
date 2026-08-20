import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthenticationService } from '@application/authentication/authentication.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyPhoneDto } from './dto/verify-phone.dto';
import { AuthenticationGuard } from '@controller/common/authentication.guard';
import { CurrentUser } from '@controller/common/current-user.decorator';
import { User } from '@application/user/user.builder';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const result = await this.authService.register({
      phone: dto.phone,
      email: dto.email,
      fullName: dto.fullName,
      password: dto.password,
      role: dto.role,
    });
    return {
      success: true,
      data: {
        user: result.user,
        token: result.token,
      },
    };
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const result = await this.authService.login(dto.phone, dto.password);
    return {
      success: true,
      data: {
        user: result.user,
        token: result.token,
      },
    };
  }

  @Post('verify-phone')
  @UseGuards(AuthenticationGuard)
  async verifyPhone(
    @CurrentUser() user: User,
    @Body() dto: VerifyPhoneDto,
  ) {
    const verifiedUser = await this.authService.verifyPhone(user.id, dto.code);
    return {
      success: true,
      data: verifiedUser,
    };
  }

  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    const result = await this.authService.refreshToken(body.refreshToken);
    return {
      success: true,
      data: result,
    };
  }
}
