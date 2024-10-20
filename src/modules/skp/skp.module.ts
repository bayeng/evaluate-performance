import { Module } from '@nestjs/common';
import { SkpService } from './skp.service';
import { SkpController } from './skp.controller';

@Module({
  controllers: [SkpController],
  providers: [SkpService],
})
export class SkpModule {}
