import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PromotionService {
  constructor(private readonly prisma: PrismaService) {}

  async findTotalKreditUserByJabatan(query: { detailUserId: string }) {
    const { detailUserId } = query;

    const detailUser = await this.prisma.detailUser.findUnique({
      where: {
        id: Number(detailUserId),
      },
    });

    if (!detailUser) {
      throw new HttpException('detail user not found', HttpStatus.NOT_FOUND);
    }

    try {
      const kredit = await this.prisma.kredit.aggregate({
        _sum: {
          total: true,
        },
        where: {
          detailUserId: Number(detailUserId),
          jabatanId: Number(detailUser.jabatanId),
        },
      });

      return kredit._sum.total;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'failed get total kredit user by pangkat',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
