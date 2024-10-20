import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTahunAjaranDto {
  @IsNotEmpty()
  @IsString()
  tahun: string;

  @IsNotEmpty()
  @IsNumber()
  semester: number;
}
