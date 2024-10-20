import { Module } from '@nestjs/common';
import { JabatanService } from './jabatan.service';

@Module({
  controllers: [],
  providers: [JabatanService],
})
export class DetailUserModule {}
