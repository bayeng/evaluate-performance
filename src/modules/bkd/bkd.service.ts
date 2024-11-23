import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBkdDto } from './dto/create-bkd.dto';
import { UpdateBkdDto } from './dto/update-bkd.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { allowed } from '../../helper/authorize.helper';

@Injectable()
export class BkdService {
  constructor(private readonly prisma: PrismaService) {}

  async createBkd(createBkdDto: CreateBkdDto, bkd: any, user: any) {
    const { statusCheckValue, tahunAjaranId, semesterValue, linkArtikel } =
      createBkdDto;

    try {
      return this.prisma.$transaction(async (tx) => {
        const createBkd = await tx.bkd.create({
          data: {
            file: 'bkd/' + bkd.filename,
            statusCheckValue: statusCheckValue,
            semesterValue: Number(semesterValue),
            tahunAjaran: {
              connect: {
                id: Number(tahunAjaranId),
              },
            },
            DetailUser: {
              connect: {
                id: Number(user.detailUser.id),
              },
            },
          },
          include: {
            DetailUser: true,
          },
        });

        await tx.artikel.create({
          data: {
            link: linkArtikel,
            bkdId: createBkd.id,
          },
        });

        await tx.logs.create({
          data: {
            group: 'CREATE',
            message: `Create BKD - id ${createBkd.id} by (${createBkd.DetailUser.id}) ${createBkd.DetailUser.nama}`,
          },
        });

        return createBkd;
      });
    } catch (e) {
      throw new HttpException(
        e.message,
        e.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAllBkdByFilter(query: any, user: any) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
      const bkd = await this.prisma.bkd.findMany({
        where: {
          detailUserId: allowed.includes(user.roleId)
            ? undefined
            : user.detailUser.id,
        },
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

  async findOneBkd(id: number, user: any) {
    try {
      const bkd = await this.prisma.bkd.findUnique({
        where: {
          id: id,
          detailUserId: user.roleId === 1 ? undefined : user.detailUser.id,
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

  async evaluateArtikel(id: number, updateBkdDto: UpdateBkdDto, user: any) {
    if (![1, 2].includes(user.roleId)) {
      throw new HttpException('You dont have permission', HttpStatus.FORBIDDEN);
    }
  }

  async update(id: number, updateBkdDto: UpdateBkdDto) {
    return `This action updates a #${id} bkd`;
  }

  async removeBkd(id: number, user: any) {
    const existBkd = await this.prisma.bkd.findUnique({
      where: {
        id: id,
      },
    });

    if (!existBkd) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }

    if (user.roleId !== 1 && user.detailUser.id !== existBkd.detailUserId) {
      throw new HttpException('You dont have permission', HttpStatus.FORBIDDEN);
    }

    await this.prisma.bkd.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
