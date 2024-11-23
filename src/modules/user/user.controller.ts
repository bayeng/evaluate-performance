import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseHelper } from '../../helper/response.helper';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const data = await this.userService.register(createUserDto);
      return ResponseHelper.success(HttpStatus.CREATED, 'user created', data);
    } catch (e) {
      throw ResponseHelper.error(HttpStatus.INTERNAL_SERVER_ERROR, e.message);
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAllUserByFilter(
    @Query()
    query: {
      keywoard?: string;
      page?: number;
      limit?: number;
    },
    @Req() req: any,
  ) {
    try {
      const datas = await this.userService.findAllUserByFilter(query, req.user);
      return ResponseHelper.success(
        HttpStatus.OK,
        'user found',
        datas.datas,
        datas.totalData,
      );
    } catch (e) {
      throw ResponseHelper.error(HttpStatus.INTERNAL_SERVER_ERROR, e.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.userService.findOne(+id);
      return ResponseHelper.success(HttpStatus.OK, 'user found', data);
    } catch (e) {
      throw ResponseHelper.error(HttpStatus.INTERNAL_SERVER_ERROR, e.message);
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() request: UpdateUserDto,
    @Req() req: any,
  ) {
    try {
      let data;
      if (req.user.roleId === 1) {
        data = await this.userService.updateUserForAdmin(+id, request);
      } else {
        data = await this.userService.updateUser(+id, request, req.user);
      }
      return ResponseHelper.success(HttpStatus.OK, 'user found', data);
    } catch (e) {
      throw ResponseHelper.error(HttpStatus.INTERNAL_SERVER_ERROR, e.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
  }
}
