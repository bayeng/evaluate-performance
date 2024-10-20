import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSkpDto {
  @IsNotEmpty()
  @IsString()
  file: string;

  @IsNotEmpty()
  @IsString()
  tahun: string;

  @IsNumber()
  statusCheckValue: number;

  @IsNotEmpty()
  @IsNumber()
  detailUserId: number;
}
