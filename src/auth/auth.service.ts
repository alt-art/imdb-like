import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { compare } from 'bcrypt';
import { User } from '@prisma/client';
import app from '../config/app';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!(user && (await compare(password, user.password)))) {
      return null;
    }
    return user;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload, {
        secret: app.appSecret,
      }),
    };
  }
}
