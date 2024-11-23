import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QuerySkpDto {
  @ApiProperty()
  @IsNumber()
  tahunAjaranId?: number;

  @ApiProperty()
  @IsNumber()
  statusCheckValue?: number;

  @ApiProperty()
  @IsNumber()
  detailUserId?: number;

  @ApiProperty()
  @IsNumber()
  page?: number;

  @ApiProperty()
  @IsNumber()
  limit?: number;
}
