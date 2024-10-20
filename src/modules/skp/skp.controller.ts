import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SkpService } from './skp.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadInterceptor } from '../../upload/upload.service';
import { EvaluateSkpDto } from './dto/evaluate-skp.dto';
import { ResponseHelper } from '../../helper/response.helper';

@Controller('skp')
export class SkpController {
  constructor(private readonly skpService: SkpService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('skp', new FileUploadInterceptor().createMulterOptions()),
  )
  async createSkp(
    @Body() createSkpDto,
    @UploadedFile() skp: Express.Multer.File,
  ) {
    try {
      const skpCreated = await this.skpService.createSkp(createSkpDto, skp);
      return ResponseHelper.success(
        HttpStatus.CREATED,
        'Success create SKP',
        skpCreated,
      );
    } catch (e) {
      throw ResponseHelper.error(e.status, e.message);
    }
  }

  @Get()
  async findAllSkpByFilter(@Query() query: any) {
    try {
      const skp = await this.skpService.findAllSkpByFilters(query);

      return ResponseHelper.success(
        HttpStatus.OK,
        'Success get all SKP by filter',
        skp,
      );
    } catch (e) {
      throw ResponseHelper.error(e.status, e.message);
    }
  }

  @Get(':id')
  async findOneSkp(@Param('id') id: string) {
    try {
      const skp = await this.skpService.findOneSkp(+id);
      return ResponseHelper.success(HttpStatus.OK, 'Success get SKP', skp);
    } catch (e) {
      throw ResponseHelper.error(e.status, e.message);
    }
  }

  @Patch('evaluate/:id')
  async evaluateSkp(@Param('id') id: string, @Body() request: EvaluateSkpDto) {
    try {
      const skp = await this.skpService.evaluateSkp(+id, request);
      return ResponseHelper.success(HttpStatus.OK, 'Success evaluate SKP', skp);
    } catch (e) {
      throw ResponseHelper.error(e.status, e.message);
    }
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('skp', new FileUploadInterceptor().createMulterOptions()),
  )
  async updateSkp(
    @Param('id') id: string,
    @Body() request: any,
    @UploadedFile() skp: Express.Multer.File,
  ) {
    try {
      const skpUpdated = await this.skpService.updateSkp(+id, request, skp);
      return ResponseHelper.success(
        HttpStatus.OK,
        'Success update SKP',
        skpUpdated,
      );
    } catch (e) {
      throw ResponseHelper.error(e.status, e.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.skpService.remove(+id);
      return ResponseHelper.success(HttpStatus.OK, 'Success delete SKP', id);
    } catch (e) {
      throw ResponseHelper.error(e.status, e.message);
    }
  }
}
