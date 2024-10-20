import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { JabatanService } from './jabatan.service';
import { ResponseHelper } from '../../helper/response.helper';
import { CreateJabatanDto } from './dto/create-jabatan.dto';
import { UpdateJabatanDto } from './dto/update-jabatan.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Jabatan')
@Controller('jabatan')
export class JabatanController {
  constructor(private readonly jabatanService: JabatanService) {}

  @Get()
  async findAllJabatan() {
    try {
      const jabatan = await this.jabatanService.findAllJabatan();
      return ResponseHelper.success(
        HttpStatus.OK,
        'Success get jabatan',
        jabatan,
      );
    } catch (e) {
      throw ResponseHelper.error(e.status, e.message);
    }
  }

  @Get(':id')
  async findOneJabatan(@Param('id') id: string) {
    try {
      const jabatan = await this.jabatanService.findOneJabatan(+id);
      return ResponseHelper.success(
        HttpStatus.OK,
        'Success get jabatan',
        jabatan,
      );
    } catch (e) {
      throw ResponseHelper.error(e.status, e.message);
    }
  }

  @Post()
  async createJabatan(@Body() request: CreateJabatanDto) {
    try {
      const jabatan = await this.jabatanService.createJabatan(request);
      return ResponseHelper.success(
        HttpStatus.CREATED,
        'Success create jabatan',
        jabatan,
      );
    } catch (e) {
      throw ResponseHelper.error(e.status, e.message);
    }
  }

  @Patch(':id')
  async updateJabatan(
    @Param('id') id: string,
    @Body() request: UpdateJabatanDto,
  ) {
    try {
      const jabatan = await this.jabatanService.updateJabatan(+id, request);
      return ResponseHelper.success(
        HttpStatus.OK,
        'Success update jabatan',
        jabatan,
      );
    } catch (e) {
      throw ResponseHelper.error(e.status, e.message);
    }
  }

  @Delete(':id')
  async removeJabatan(@Param('id') id: string) {
    try {
      await this.jabatanService.removeJabatan(+id);
      return ResponseHelper.success(
        HttpStatus.OK,
        'Success delete jabatan',
        id,
      );
    } catch (e) {
      throw ResponseHelper.error(e.status, e.message);
    }
  }
}
