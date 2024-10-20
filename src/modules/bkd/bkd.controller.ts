import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BkdService } from './bkd.service';
import { CreateBkdDto } from './dto/create-bkd.dto';
import { UpdateBkdDto } from './dto/update-bkd.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadInterceptor } from '../../upload/upload.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('bkd')
@Controller('bkd')
export class BkdController {
  constructor(private readonly bkdService: BkdService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('bkd', new FileUploadInterceptor().createMulterOptions()),
  )
  async create(
    @Body() request: CreateBkdDto,
    @UploadedFile() bkd: Express.Multer.File,
  ) {
    try {
    } catch (e) {}
  }

  @Get()
  async findAll(@Query() query: any) {
    return this.bkdService.findAllBkd(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bkdService.findOneBkd(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBkdDto: UpdateBkdDto) {
    return this.bkdService.update(+id, updateBkdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bkdService.remove(+id);
  }
}
