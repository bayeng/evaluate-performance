import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { allowed } from '../../helper/authorize.helper';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async register(createUserDto: CreateUserDto) {
    const {
      username,
      password,
      roleId,
      nama,
      nip,
      tmt,
      jabatanId,
      typeDosenId,
    } = createUserDto;

    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (user) {
      throw new HttpException('username already exist', HttpStatus.CONFLICT);
    }

    try {
      const hashPassword = await bcrypt.hash(password, 10);
      return await this.prisma.user.create({
        data: {
          username: username,
          password: hashPassword,
          roleId: Number(roleId),
          detailUser: {
            create: {
              nama: nama,
              nip: nip,
              tmt: tmt,
              jabatanId: Number(jabatanId),
              typeDosenId: Number(typeDosenId),
            },
          },
        },
        include: {
          detailUser: true,
        },
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllUserByFilter(query: any, user: any) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const offset = (page - 1) * limit;

    const datas = await this.prisma.user.findMany({
      skip: offset,
      take: limit,
      where: {
        id: allowed.includes(user.roleId) ? undefined : user.id,
      },
      include: {
        detailUser: true,
      },
    });
    if (datas.length === 0) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }

    const totalData = await this.prisma.user.count({
      where: {
        id: allowed.includes(user.roleId) ? undefined : user.id,
      },
    });
    return { datas, totalData };
  }

  async findOne(id: number) {
    const data = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        detailUser: true,
      },
    });

    if (!data) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto, user: any) {
    const {
      username,
      password,
      oldPassword,
      roleId,
      nama,
      nip,
      tmt,
      jabatanId,
      typeDosenId,
    } = updateUserDto;

    const findUser = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!findUser) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    let hashPassword;
    if (password) {
      hashPassword = await bcrypt.hash(password, 10);
    }

    if (hashPassword === null) {
      const checkPassword = bcrypt.compare(oldPassword, findUser.password);
      if (!checkPassword) {
        throw new HttpException(
          'invalid old password',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
    try {
      return await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          username: username,
          password: hashPassword !== null ? hashPassword : findUser.password,
          roleId: Number(roleId),
          detailUser: {
            create: {
              nama: nama,
              nip: nip,
              tmt: tmt,
              jabatanId: Number(jabatanId),
              typeDosenId: Number(typeDosenId),
            },
          },
        },
        include: {
          detailUser: true,
        },
      });
    } catch (e) {
      throw new HttpException(
        'Failed update user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUserForAdmin(id: number, updateUserDto: UpdateUserDto) {
    const { username, password, roleId } = updateUserDto;

    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    let hashPassword;
    if (password) {
      hashPassword = await bcrypt.hash(password, 10);
    }

    try {
      return await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          username: username,
          password: hashPassword !== null ? hashPassword : user.password,
          roleId: Number(roleId),
        },
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUser(id: number) {
    try {
      const findUser = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!findUser) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }
      await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          username: findUser.username + `${Date.now()}`,
          deletedAt: new Date(),
        },
      });
    } catch (e) {
      throw new HttpException(
        'Failed delete user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
