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
  Headers,
  Req,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { BkdService } from './bkd.service';
import { CreateBkdDto } from './dto/create-bkd.dto';
import { UpdateBkdDto } from './dto/update-bkd.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadInterceptor } from '../../upload/upload.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { ResponseHelper } from '../../helper/response.helper';

@ApiTags('bkd')
@Controller('bkd')
@UseGuards(AuthGuard)
export class BkdController {
  constructor(private readonly bkdService: BkdService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('bkd', new FileUploadInterceptor().createMulterOptions()),
  )
  async create(
    @Body() request: CreateBkdDto,
    @UploadedFile() bkd: Express.Multer.File,
    @Req() req: any,
  ) {
    try {
      const bkdCreated = await this.bkdService.createBkd(
        request,
        bkd,
        req.user,
      );
      return ResponseHelper.success(
        HttpStatus.CREATED,
        'Success create BKD',
        bkdCreated,
      );
    } catch (e) {}
  }

  @Get()
  async findAllBkdByFilter(@Query() query: any, @Req() req: any) {
    return this.bkdService.findAllBkdByFilter(query, req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.bkdService.findOneBkd(+id, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBkdDto: UpdateBkdDto) {
    return this.bkdService.update(+id, updateBkdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.bkdService.removeBkd(+id, req.user);
  }
}
