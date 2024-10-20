import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTahunAjaranDto } from './dto/create-tahun-ajaran.dto';
import { UpdateTahunAjaranDto } from './dto/update-tahun-ajaran.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Value } from '../../helper/value.helper';

@Injectable()
export class TahunAjaranService {
  constructor(private readonly prisma: PrismaService) {}

  async createTahunAjaran(request: CreateTahunAjaranDto) {
    const { tahun, semester } = request;
    try {
      const tahunAjaran = await this.prisma.tahunAjaran.create({
        data: {
          tahun: tahun,
          semester: Value.semester[Number(semester)],
        },
      });

      return tahunAjaran;
    } catch (e) {
      throw new HttpException(
        'Failed create Tahun Ajaran',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllTahunAjaran() {
    try {
      const tahunAjaran = await this.prisma.tahunAjaran.findMany();
      if (tahunAjaran.length === 0) {
        throw new HttpException('data not found', HttpStatus.NOT_FOUND);
      }
      return tahunAjaran;
    } catch (e) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }
  }

  async findOneTahunAjaran(id: number) {
    try {
      const tahunAjaran = await this.prisma.tahunAjaran.findUnique({
        where: {
          id: id,
        },
      });

      return tahunAjaran;
    } catch (e) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateTahunAjaran(id: number, request: UpdateTahunAjaranDto) {
    const { tahun, semester } = request;

    const isExist = await this.prisma.tahunAjaran.findUnique({
      where: {
        id: id,
      },
    });
    if (!isExist) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }

    try {
      const tahunAjaran = await this.prisma.tahunAjaran.update({
        where: {
          id: id,
        },
        data: {
          tahun: tahun,
          semester: Value.semester[Number(semester)],
        },
      });

      return tahunAjaran;
    } catch (e) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} tahunAjaran`;
  }
}
