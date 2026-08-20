import { Module } from '@nestjs/common';
import { MainModule } from './main.module';

@Module({
  imports: [MainModule],
})
export class AppModule {}
