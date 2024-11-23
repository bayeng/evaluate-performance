import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDetailUserDto } from './dto/create-detail-user.dto';
import { UpdateDetailUserDto } from './dto/update-detail-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { allowed } from '../../helper/authorize.helper';

@Injectable()
export class DetailUserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllDetailUserByFilter(query: any) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const offset = (page - 1) * limit;

    const datas = await this.prisma.detailUser.findMany({
      skip: offset,
      take: limit,
    });
    if (datas.length === 0) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }
    return datas;
  }

  async findOneDetailUser(id: number, user: any) {
    const data = await this.prisma.detailUser.findUnique({
      where: {
        id: id,
        userId: allowed.includes(user.roleId) ? undefined : user.id,
      },
    });
    if (!data) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }

    return data;
  }
}
