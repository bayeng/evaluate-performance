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
  UseGuards,
  Req,
} from '@nestjs/common';
import { DetailUserService } from './detail-user.service';
import { CreateDetailUserDto } from './dto/create-detail-user.dto';
import { UpdateDetailUserDto } from './dto/update-detail-user.dto';
import { ResponseHelper } from '../../helper/response.helper';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';

@ApiTags('detail-user')
@Controller('detail-users')
@UseGuards(AuthGuard)
export class DetailUserController {
  constructor(private readonly detailUserService: DetailUserService) {}

  @ApiResponse({
    example: {
      statusCode: 200,
      message: 'user details found',
      data: [
        {
          id: 1,
          nama: 'bayeng',
          nip: '23423425',
          tmt: '12-08-2002',
          jabatanId: 1,
          userId: 1,
          typeDosenId: 1,
        },
        {
          id: 2,
          nama: 'kunam',
          nip: '23423425',
          tmt: '12-08-2002',
          jabatanId: 1,
          userId: 2,
          typeDosenId: 1,
        },
      ],
    },
  })
  @Get()
  async findAllDetailUser(@Query() query: any) {
    try {
      const datas =
        await this.detailUserService.findAllDetailUserByFilter(query);
      return ResponseHelper.success(HttpStatus.OK, 'user details found', datas);
    } catch (e) {
      throw ResponseHelper.error(HttpStatus.INTERNAL_SERVER_ERROR, e.message);
    }
  }

  @Get(':id')
  async findOneDetailUser(@Param('id') id: string, @Req() req: any) {
    try {
      const data = await this.detailUserService.findOneDetailUser(
        +id,
        req.user,
      );
      return ResponseHelper.success(HttpStatus.OK, 'user detail found', data);
    } catch (e) {
      throw ResponseHelper.error(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'internal server error',
      );
    }
  }
}
