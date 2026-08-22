import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolService } from '@application/tools/tool.service';
import { ToolRepository } from '@persistence/tools/tool.repository';
import { Tool } from '@persistence/tools/tool.entity';
import { ToolsController } from '@controller/tools/tools.controller';
import { AuthenticationModule } from './authentication.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tool]),
    AuthenticationModule,
    UserModule,
  ],
  controllers: [ToolsController],
  providers: [
    ToolService,
    {
      provide: 'ToolRepositoryInterface',
      useClass: ToolRepository,
    },
  ],
  exports: [ToolService],
})
export class ToolsModule {}