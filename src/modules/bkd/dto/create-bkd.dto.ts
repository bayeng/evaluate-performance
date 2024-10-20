import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBkdDto {
  @IsNotEmpty()
  @IsString()
  file: string;

  @IsNotEmpty()
  @IsNumber()
  tahunAjaranId: number;

  @IsNotEmpty()
  @IsNumber()
  statusCheckValue: number;

  @IsNotEmpty()
  @IsNumber()
  detailUserId: number;
}
