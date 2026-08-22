import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationService } from '@application/authentication/authentication.service';
import { AuthenticationController } from '@controller/authentication/authentication.controller';
import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [AuthenticationService, JwtModule],
})
export class AuthenticationModule {}