import { Module } from '@nestjs/common';
import { AuthenticationModule } from './module/authentication.module';
import { UserModule } from './module/user.module';

@Module({
  imports: [AuthenticationModule, UserModule],
})
export class MainModule {}
