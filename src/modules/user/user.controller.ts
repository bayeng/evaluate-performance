import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseHelper } from '../../helper/response.helper';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const data = await this.userService.create(createUserDto);
      return ResponseHelper.success(HttpStatus.CREATED, 'user created', data);
    } catch (e) {
      throw ResponseHelper.error(HttpStatus.INTERNAL_SERVER_ERROR, e.message);
    }
  }

  @Get()
  async findAll() {
    try {
      const datas = await this.userService.findAll();
      return ResponseHelper.success(HttpStatus.OK, 'user found', datas);
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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
