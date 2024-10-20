import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTahunAjaranDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tahun: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  semester: number;
}
