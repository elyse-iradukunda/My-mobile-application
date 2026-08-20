import { Module } from '@nestjs/common';
import { UserService } from '@application/user/user.service';
import { UserRepository } from '@persistence/user/user.repository';
import { DatabaseConnection } from '@persistence/database-connection';

@Module({
  providers: [
    UserService,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
    DatabaseConnection,
  ],
  exports: [UserService],
})
export class UserModule {}
