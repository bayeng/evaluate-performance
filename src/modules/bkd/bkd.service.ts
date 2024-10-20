import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBkdDto } from './dto/create-bkd.dto';
import { UpdateBkdDto } from './dto/update-bkd.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BkdService {
  constructor(private readonly prisma: PrismaService) {}

  async createBkd(request: CreateBkdDto, file: any) {
    const { statusCheckValue, tahunAjaranId, detailUserId } = request;

    try {
      const bkd = await this.prisma.bkd.create({
        data: {
          file: 'bkd/' + file.filename,
          statusCheckValue: statusCheckValue,
          tahunAjaranId: Number(tahunAjaranId),
          detailUserId: Number(detailUserId),
        },
      });

      return bkd;
    } catch (e) {
      throw new HttpException(
        e.message,
        e.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAllBkd(query: any) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
      const bkd = await this.prisma.bkd.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          id: 'desc',
        },
      });
      if (bkd.length === 0) {
        throw new HttpException('data not found', 204);
      }
      return bkd;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneBkd(id: number) {
    try {
      const bkd = await this.prisma.bkd.findUnique({
        where: {
          id: id,
        },
      });

      if (!bkd) {
        throw new HttpException('data not found', HttpStatus.NOT_FOUND);
      }
      return bkd;
    } catch (e) {
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateBkdDto: UpdateBkdDto) {
    return `This action updates a #${id} bkd`;
  }

  remove(id: number) {
    return `This action removes a #${id} bkd`;
  }
}
