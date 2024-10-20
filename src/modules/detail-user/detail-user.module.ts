import { Module } from '@nestjs/common';
import { DetailUserService } from './detail-user.service';
import { DetailUserController } from './detail-user.controller';

@Module({
  controllers: [DetailUserController],
  providers: [DetailUserService],
})
export class DetailUserModule {}
