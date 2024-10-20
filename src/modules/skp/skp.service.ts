import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Value } from '../../helper/value.helper';
import { join } from 'path';
import * as fs from 'node:fs';
import * as ExcelJS from 'exceljs';
import { EvaluateSkpDto } from './dto/evaluate-skp.dto';

@Injectable()
export class SkpService {
  constructor(private readonly prisma: PrismaService) {}

  async createSkp(request, file) {
    const { tahun, statusCheckValue, detailUserId } = request;
    try {
      const skp = await this.prisma.skp.create({
        data: {
          file: 'skp/' + file.filename,
          tahun: tahun,
          statusCheckValue: Number(statusCheckValue),
          detailUserId: Number(detailUserId),
        },
      });

      return skp;
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed create SKP', HttpStatus.BAD_REQUEST);
    }
  }

  async findAllSkpByFilters(query) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const offset = (page - 1) * limit;

    const datas = await this.prisma.skp.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        id: 'desc',
      },
    });
    if (datas.length === 0) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }
    return datas;
  }

  async findOneSkp(id: number) {
    const skp = await this.prisma.skp.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!skp) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }
    return skp;
  }

  async updateSkp(id: number, request: any, file: any) {
    const { statusCheckValue, detailUserId } = request;

    const getSkp = await this.prisma.skp.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!getSkp) {
      throw new HttpException('skp not found', HttpStatus.NOT_FOUND);
    }
    if (getSkp.statusCheckValue === 1) {
      throw new HttpException('skp already approved', HttpStatus.BAD_REQUEST);
    }

    try {
      const getOldFile = getSkp.file;
      if (getOldFile) {
        fs.unlinkSync(join(process.cwd(), getOldFile));
      }

      const skp = await this.prisma.skp.update({
        where: {
          id: Number(id),
        },
        data: {
          file: 'skp/' + file.filename,
        },
      });

      return skp;
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed update SKP', HttpStatus.BAD_REQUEST);
    }
  }

  async evaluateSkp(id: number, request: EvaluateSkpDto) {
    const {
      hasilKerja1,
      hasilKerja2,
      hasilKerja1Value,
      hasilKerja2Value,
      berorientasiPelayanan,
      akuntabel,
      kompeten,
      harmonis,
      loyal,
      adapatif,
      kolaboratif,
      berorientasiPelayananValue,
      akuntabelValue,
      kompetenValue,
      harmonisValue,
      loyalValue,
      adapatifValue,
      kolaboratifValue,
      userPemimpinId,
    } = request;

    const getSkp = await this.prisma.skp.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!getSkp) {
      throw new HttpException('skp not found', HttpStatus.NOT_FOUND);
    }

    const filePath = join(process.cwd(), 'public', getSkp.file);

    if (!fs.existsSync(filePath)) {
      throw new HttpException(
        'skp has ben deleted or not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.worksheets[8];

    // Hasil Kerja
    const cellHasilKerja1Value = worksheet.getCell('L19').value;
    const cellHasilKerja1 = worksheet.getCell('K19').value;
    if (cellHasilKerja1 !== null) {
      worksheet.getCell('K19').value = hasilKerja1;
    }
    if (cellHasilKerja1Value !== null) {
      worksheet.getCell('L19').value =
        Value.statusNilai[Number(hasilKerja1Value)];
    }

    const cellHasilKerja2Value = worksheet.getCell('L21').value;
    const cellHasilKerja2 = worksheet.getCell('K21').value;
    if (cellHasilKerja2 !== null) {
      worksheet.getCell('K21').value = hasilKerja2;
    }
    if (cellHasilKerja2Value !== null) {
      worksheet.getCell('L21').value =
        Value.statusNilai[Number(hasilKerja2Value)];
    }

    // PerilakuKerja
    const cellBerorientasiPelayananValue = worksheet.getCell('L31').value;
    const cellBerorientasiPelayanan = worksheet.getCell('K32').value;
    if (cellBerorientasiPelayanan !== null) {
      worksheet.getCell('K32').value = berorientasiPelayanan;
    }
    if (cellBerorientasiPelayananValue !== null) {
      worksheet.getCell('L31').value =
        Value.statusNilai[berorientasiPelayananValue];
    }

    const cellAkuntabelValue = worksheet.getCell('L35').value;
    const cellAkuntabel = worksheet.getCell('K36').value;
    if (cellAkuntabel !== null) {
      worksheet.getCell('K36').value = akuntabel;
    }
    if (cellAkuntabelValue !== null) {
      worksheet.getCell('L35').value = Value.statusNilai[akuntabelValue];
    }

    const cellKompetenValue = worksheet.getCell('L39').value;
    const cellKompeten = worksheet.getCell('K40').value;
    if (cellKompeten !== null) {
      worksheet.getCell('K40').value = kompeten;
    }
    if (cellKompetenValue !== null) {
      worksheet.getCell('L39').value = Value.statusNilai[kompetenValue];
    }

    const cellHarmonisValue = worksheet.getCell('L43').value;
    const cellHarmonis = worksheet.getCell('K44').value;
    if (cellHarmonis !== null) {
      worksheet.getCell('K44').value = harmonis;
    }
    if (cellHarmonisValue !== null) {
      worksheet.getCell('L43').value = Value.statusNilai[harmonisValue];
    }

    const cellLoyalValue = worksheet.getCell('L48').value;
    const cellLoyal = worksheet.getCell('K49').value;
    if (cellLoyal !== null) {
      worksheet.getCell('K49').value = loyal;
    }
    if (cellLoyalValue !== null) {
      worksheet.getCell('L48').value = Value.statusNilai[loyalValue];
    }

    const cellAdaptifValue = worksheet.getCell('L52').value;
    const cellAdaptif = worksheet.getCell('K53').value;
    if (cellAdaptif !== null) {
      worksheet.getCell('K53').value = adapatif;
    }
    if (cellAdaptifValue !== null) {
      worksheet.getCell('L52').value = Value.statusNilai[adapatifValue];
    }

    const cellKolaboratifValue = worksheet.getCell('L56').value;
    const cellKolaboratif = worksheet.getCell('K57').value;
    if (cellKolaboratif !== null) {
      worksheet.getCell('K57').value = kolaboratif;
    }
    if (cellKolaboratifValue !== null) {
      worksheet.getCell('L56').value = Value.statusNilai[kolaboratifValue];
    }

    const ratingPerilakuKerja = this.calculateRatingPerilakuKerja(
      berorientasiPelayananValue,
      akuntabelValue,
      kompetenValue,
      harmonisValue,
      loyalValue,
      adapatifValue,
      kolaboratifValue,
    );

    const hasilKerja = this.hasilKerja(
      Number(hasilKerja1Value),
      Number(hasilKerja2Value),
    );
    const predikatKinerjaPegawai = this.predikatKinerjaPegawai(
      hasilKerja,
      ratingPerilakuKerja,
    );

    await workbook.xlsx.writeFile(filePath);

    const getPemimpin = await this.prisma.detailUser.findUnique({
      where: {
        id: Number(userPemimpinId),
      },
    });

    try {
      const skp = await this.prisma.skp.update({
        where: {
          id: Number(id),
        },
        data: {
          beroriantasiPelayanan: berorientasiPelayanan,
          akuntabel: akuntabel,
          kompeten: kompeten,
          harmonis: harmonis,
          loyal: loyal,
          adaptif: adapatif,
          kolaboratif: kolaboratif,
          berorientasiPelayananValue: Number(berorientasiPelayananValue),
          akuntabelValue: Number(akuntabelValue),
          kompetenValue: Number(kompetenValue),
          harmonisValue: Number(harmonisValue),
          loyalValue: Number(loyalValue),
          adaptifValue: Number(adapatifValue),
          kolaboratifValue: Number(kolaboratifValue),
          hasilKerja1Value: Number(hasilKerja1Value),
          hasilKerja2Value: Number(hasilKerja2Value),
          hasilKerja: hasilKerja,
          ratingPerilakuKerja: ratingPerilakuKerja,
          predikatKinerjaPegawai: predikatKinerjaPegawai,
        },
      });

      await this.prisma.logs.create({
        data: {
          group: 'UPDATE',
          message: `Update SKP id ${id} by ${getPemimpin.id} ${getPemimpin.nama}`,
        },
      });

      return skp;
    } catch (e) {
      throw new HttpException(
        'data not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.skp.delete({
        where: {
          id: id,
        },
      });

      return 'data with id ' + id + ' deleted';
    } catch (error) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }
  }

  calculateRatingPerilakuKerja(
    berorientasiPelayanan: number,
    akuntabel: number,
    kompeten: number,
    harmonis: number,
    loyal: number,
    adapatif: number,
    kolaboratif: number,
  ): string {
    const average =
      (berorientasiPelayanan +
        akuntabel +
        kompeten +
        harmonis +
        loyal +
        adapatif +
        kolaboratif) /
      7;

    if (average >= 2.5) {
      return 'DIATAS EKSPEKTASI';
    } else if (average >= 1.5) {
      return 'SESUAI EKSPEKTASI';
    } else {
      return 'DIBAWAH EKSPEKTASI';
    }
  }

  hasilKerja(numb1: number, numb2: number): string {
    const average = (numb1 + numb2) / 2;
    if (average >= 2.5) {
      return 'DIATAS EKSPEKTASI';
    } else if (average >= 1.5) {
      return 'SESUAI EKSPEKTASI';
    } else {
      return 'DIBAWAH EKSPEKTASI';
    }
  }

  predikatKinerjaPegawai(A29: string, A61: string): string {
    if (A29 === 'DIATAS EKSPEKTASI' && A61 === 'DIATAS EKSPEKTASI') {
      return 'SANGAT BAIK';
    } else if (A29 === 'DIATAS EKSPEKTASI' && A61 === 'SESUAI EKSPEKTASI') {
      return 'BAIK';
    } else if (A29 === 'DIATAS EKSPEKTASI' && A61 === 'DIBAWAH EKSPEKTASI') {
      return 'SANGAT KURANG';
    } else if (A29 === 'SESUAI EKSPEKTASI' && A61 === 'SESUAI EKSPEKTASI') {
      return 'BAIK';
    } else if (A29 === 'SESUAI EKSPEKTASI' && A61 === 'DIATAS EKSPEKTASI') {
      return 'BAIK';
    } else if (A29 === 'SESUAI EKSPEKTASI' && A61 === 'DIBAWAH EKSPEKTASI') {
      return 'KURANG';
    } else if (A29 === 'DIBAWAH EKSPEKTASI' && A61 === 'DIATAS EKSPEKTASI') {
      return 'BUTUH PERBAIKAN';
    } else if (A29 === 'DIBAWAH EKSPEKTASI' && A61 === 'SESUAI EKSPEKTASI') {
      return 'KURANG';
    } else if (A29 === 'DIBAWAH EKSPEKTASI' && A61 === 'DIBAWAH EKSPEKTASI') {
      return 'SANGAT KURANG';
    } else {
      return 'TIDAK VALID';
    }
  }
}
