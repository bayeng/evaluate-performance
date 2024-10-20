import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TahunAjaranService } from './tahun-ajaran.service';
import { CreateTahunAjaranDto } from './dto/create-tahun-ajaran.dto';
import { UpdateTahunAjaranDto } from './dto/update-tahun-ajaran.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tahun Ajaran')
@Controller('tahun-ajaran')
export class TahunAjaranController {
  constructor(private readonly tahunAjaranService: TahunAjaranService) {}

  @Post()
  async createTahunAjaran(@Body() request: CreateTahunAjaranDto) {
    return this.tahunAjaranService.createTahunAjaran(request);
  }

  @Get()
  async findAll() {
    return this.tahunAjaranService.findAllTahunAjaran();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tahunAjaranService.findOneTahunAjaran(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() request: UpdateTahunAjaranDto) {
    return this.tahunAjaranService.updateTahunAjaran(+id, request);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tahunAjaranService.remove(+id);
  }
}
