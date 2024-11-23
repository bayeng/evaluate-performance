import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBkdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  file: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  tahunAjaranId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  statusCheckValue: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  semesterValue: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  linkArtikel: string;
}
