import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { username, password, roleId } = createUserDto;

    try {
      const data = await this.prisma.user.create({
        data: {
          username: username,
          password: password,
          roleId: Number(roleId),
        },
      });

      return data;
    } catch (e) {
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    const datas = await this.prisma.user.findMany();
    if (datas.length === 0) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }

    return datas;
  }

  async findOne(id: number) {
    const data = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!data) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
