import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from './module/authentication.module';
import { UserModule } from './module/user.module';
import { ToolsModule } from './module/tools.module';
import { databaseConfig } from '@persistence/database-connection.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AuthenticationModule,
    UserModule,
    ToolsModule,
  ],
})
export class MainModule {}