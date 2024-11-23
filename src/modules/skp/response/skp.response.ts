import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SkpResponse {
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
  detailUserId: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  hasilKerja1: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  hasilKerja1Value: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  hasilKerja2: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  hasilKerja2Value: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  berorientasiPelayanan: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  berorientasiPelayananValue: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  akuntabel: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  akuntabelValue: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  kompeten: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  kompetenValue: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  harmonis: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  harmonisValue: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  loyal: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  loyalValue: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  adapatif: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  adapatifValue: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  kolaboratif: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  kolaboratifValue: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  ratingPerilakuKerja: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  predikatPegawai: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  hasilKerja: string;
}
