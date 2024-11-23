import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  roleId: number;

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
  typeDosenId: number;
}
