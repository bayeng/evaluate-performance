import { PartialType } from '@nestjs/swagger';
import { CreateSkpDto } from './create-skp.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class EvaluateSkpDto extends PartialType(CreateSkpDto) {
  @IsOptional()
  @IsString()
  hasilKerja1: string;

  @IsNotEmpty()
  @IsNumber()
  hasilKerja1Value: string;

  @IsOptional()
  @IsString()
  hasilKerja2: string;

  @IsNotEmpty()
  @IsNumber()
  hasilKerja2Value: number;

  @IsNotEmpty()
  statusCheckValue: number;

  @IsOptional()
  @IsString()
  berorientasiPelayanan: string;

  @IsNotEmpty()
  @IsNumber()
  berorientasiPelayananValue: number;

  @IsOptional()
  @IsString()
  akuntabel: string;

  @IsNotEmpty()
  @IsNumber()
  akuntabelValue: number;

  @IsOptional()
  @IsString()
  kompeten: string;

  @IsNotEmpty()
  @IsNumber()
  kompetenValue: number;

  @IsOptional()
  @IsString()
  harmonis: string;

  @IsNotEmpty()
  @IsNumber()
  harmonisValue: number;

  @IsOptional()
  @IsString()
  loyal: string;

  @IsNotEmpty()
  @IsNumber()
  loyalValue: number;

  @IsOptional()
  @IsString()
  adapatif: string;

  @IsNotEmpty()
  @IsNumber()
  adapatifValue: number;

  @IsOptional()
  @IsString()
  kolaboratif: string;

  @IsNotEmpty()
  @IsNumber()
  kolaboratifValue: number;

  @IsOptional()
  @IsNumber()
  ratingPerilakuKerja: number;

  @IsOptional()
  @IsString()
  predikatPegawai: string;

  @IsString()
  @IsOptional()
  hasilKerja: string;

  @IsNotEmpty()
  @IsNumber()
  userPemimpinId: number;
}
