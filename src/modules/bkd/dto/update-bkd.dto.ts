import { PartialType } from '@nestjs/swagger';
import { CreateBkdDto } from './create-bkd.dto';

export class UpdateBkdDto extends PartialType(CreateBkdDto) {}
