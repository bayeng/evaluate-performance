import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDetailUserDto } from './dto/create-detail-user.dto';
import { UpdateDetailUserDto } from './dto/update-detail-user.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DetailUserService {
  constructor(private readonly prisma: PrismaService) {}

  async createDetailUser(createDetailUserDto: any) {
    const { nama, nip, tmt, jabatanId, userId, typeDosenId } =
      createDetailUserDto;

    const check = await this.prisma.detailUser.findFirst({
      where: { userId: Number(userId) },
    });

    if (check) {
      throw new HttpException('user has a detail user', HttpStatus.CONFLICT);
    }
    try {
      const data = await this.prisma.detailUser.create({
        data: {
          nama: nama,
          nip: nip,
          tmt: tmt,
          jabatanId: Number(jabatanId),
          userId: Number(userId),
          typeDosenId: Number(typeDosenId),
        },
      });

      return data;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllDetailUser(query: any) {
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

  async findOneDetailUser(id: number) {
    const data = await this.prisma.detailUser.findUnique({
      where: {
        id: id,
      },
    });
    if (!data) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async updateDetailUser(id: number, request: UpdateDetailUserDto) {
    const { nama, nip, tmt, jabatanId, userId, typeDosenId } = request;

    const isExist = await this.prisma.detailUser.findUnique({
      where: {
        id: id,
      },
    });
    if (!isExist) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }

    try {
      const detailUser = await this.prisma.detailUser.update({
        where: {
          id: id,
        },
        data: {
          nama: nama,
          nip: nip,
          tmt: tmt,
          jabatanId: Number(jabatanId),
          userId: Number(userId),
          typeDosenId: Number(typeDosenId),
        },
      });

      return detailUser;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'failed update detail userx',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeDetailUser(id: number) {
    try {
      const detailUser = await this.prisma.detailUser.delete({
        where: {
          id: id,
        },
      });
      return detailUser;
    } catch (error) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }
  }
}
