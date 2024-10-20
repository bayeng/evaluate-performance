import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

export class CreateJabatanDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
