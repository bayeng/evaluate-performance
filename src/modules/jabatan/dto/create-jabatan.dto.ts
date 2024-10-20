import { IsNotEmpty, IsString } from 'class-validator';

export class CreateJabatanDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
