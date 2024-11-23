import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSkpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tahunAjaranId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  statusCheckValue: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  detailUserId: number;
}
