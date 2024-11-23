import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(request: LoginDto) {
    const { username, password } = request;

    const findUser = await this.prisma.user.findUnique({
      where: {
        username: username,
        deletedAt: null,
      },
      include: {
        detailUser: true,
      },
    });
    if (!findUser || !(await bcrypt.compare(password, findUser.password))) {
      throw new HttpException(
        'invalid username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = {
      username: findUser.username,
      id: findUser.id,
      roleId: findUser.roleId,
      detailUser: findUser.detailUser,
    };

    const refToken = await this.prisma.refToken.findFirst({
      where: {
        userId: findUser.id,
      },
    });

    if (refToken) {
      await this.prisma.refToken.deleteMany({
        where: {
          userId: findUser.id,
        },
      });
    }

    try {
      const accessToken = await this.jwtService.signAsync(payload);

      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '30d',
      });

      await this.prisma.refToken.create({
        data: {
          userId: findUser.id,
          refreshToken: refreshToken,
        },
      });

      return {
        accessToken,
        refreshToken,
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
