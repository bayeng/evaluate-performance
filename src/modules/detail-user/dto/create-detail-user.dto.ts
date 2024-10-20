import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDetailUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nama: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nip: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tmt: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  jabatanId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  typeDosenId: number;
}
