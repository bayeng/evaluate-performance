import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSkpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  file: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tahun: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  statusCheckValue: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  detailUserId: number;
}
