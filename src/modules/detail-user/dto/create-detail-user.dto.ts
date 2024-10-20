import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDetailUserDto {
  @IsNotEmpty()
  @IsString()
  nama: string;

  @IsNotEmpty()
  @IsString()
  nip: string;

  @IsNotEmpty()
  @IsString()
  tmt: string;

  @IsNotEmpty()
  @IsNumber()
  jabatanId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  typeDosenId: number;
}
