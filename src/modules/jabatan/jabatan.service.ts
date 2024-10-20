import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateJabatanDto } from './dto/create-jabatan.dto';
import { UpdateJabatanDto } from './dto/update-jabatan.dto';

@Injectable()
export class JabatanService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllJabatan() {
    const jabatan = await this.prisma.jabatan.findMany();
    if (jabatan.length === 0) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }
    return jabatan;
  }

  async findOneJabatan(id: number) {
    const jabatan = await this.prisma.jabatan.findUnique({
      where: {
        id: id,
      },
    });
    if (!jabatan) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }
    return jabatan;
  }

  async createJabatan(request: CreateJabatanDto) {
    try {
      const { name } = request;
      const jabatan = await this.prisma.jabatan.create({
        data: {
          name,
        },
      });
      return jabatan;
    } catch (e) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateJabatan(id: number, request: UpdateJabatanDto) {
    const { name } = request;
    const isExist = await this.prisma.jabatan.findUnique({
      where: {
        id: id,
      },
    });
    if (!isExist) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }
    try {
      const jabatan = await this.prisma.jabatan.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
      return jabatan;
    } catch (e) {
      throw new HttpException(
        'failded update jabatan',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeJabatan(id: number) {
    try {
      const jabatan = await this.prisma.jabatan.delete({
        where: {
          id: id,
        },
      });
      return jabatan;
    } catch (error) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }
  }
}
