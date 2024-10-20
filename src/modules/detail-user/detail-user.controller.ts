import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { DetailUserService } from './detail-user.service';
import { CreateDetailUserDto } from './dto/create-detail-user.dto';
import { UpdateDetailUserDto } from './dto/update-detail-user.dto';
import { ResponseHelper } from '../../helper/response.helper';

@Controller('detail-users')
export class DetailUserController {
  constructor(private readonly detailUserService: DetailUserService) {}

  @Post()
  async createDetailuser(@Body() request: CreateDetailUserDto) {
    try {
      const data = await this.detailUserService.createDetailUser(request);
      return ResponseHelper.success(
        HttpStatus.CREATED,
        'user detail created',
        data,
      );
    } catch (e) {
      throw ResponseHelper.error(HttpStatus.INTERNAL_SERVER_ERROR, e.message);
    }
  }

  @Get()
  async findAllDetailUser(@Query() query: any) {
    try {
      const datas = await this.detailUserService.findAllDetailUser(query);
      return ResponseHelper.success(HttpStatus.OK, 'user details found', datas);
    } catch (e) {
      throw ResponseHelper.error(HttpStatus.INTERNAL_SERVER_ERROR, e.message);
    }
  }

  @Get(':id')
  async findOneDetailUser(@Param('id') id: string) {
    try {
      const data = await this.detailUserService.findOneDetailUser(+id);
      return ResponseHelper.success(HttpStatus.OK, 'user detail found', data);
    } catch (e) {
      throw ResponseHelper.error(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'internal server error',
      );
    }
  }

  @Patch(':id')
  async updateDetailUser(
    @Param('id') id: string,
    @Body() request: UpdateDetailUserDto,
  ) {
    try {
      const data = await this.detailUserService.findOneDetailUser(+id);

      return ResponseHelper.success(
        HttpStatus.OK,
        'success update user detail',
        data,
      );
    } catch (e) {
      throw ResponseHelper.error(e.status, e.message);
    }
  }

  @Delete(':id')
  async removeDetailUser(@Param('id') id: string) {
    try {
      await this.detailUserService.removeDetailUser(+id);
      return ResponseHelper.success(
        HttpStatus.OK,
        'Success delete user detail',
        id,
      );
    } catch (e) {
      throw ResponseHelper.error(e.status, e.message);
    }
  }
}
