import { Module } from '@nestjs/common';
import { BkdService } from './bkd.service';
import { BkdController } from './bkd.controller';

@Module({
  controllers: [BkdController],
  providers: [BkdService],
})
export class BkdModule {}
