import { PartialType } from '@nestjs/swagger';
import { CreateJabatanDto } from './create-jabatan.dto';

export class UpdateJabatanDto extends PartialType(CreateJabatanDto) {}
