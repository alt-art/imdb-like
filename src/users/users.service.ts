import { Injectable } from '@nestjs/common';
import { hash, genSalt } from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { UserCreateDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createUser(data: UserCreateDto) {
    const salt = await genSalt(10);
    return this.prismaService.user.create({
      data: {
        email: data.email,
        password: await hash(data.password, salt),
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getUser(id: number) {
    return this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateUser(id: number, data: UserCreateDto) {
    return this.prismaService.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
