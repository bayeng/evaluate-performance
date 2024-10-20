import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

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
}
