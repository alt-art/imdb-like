import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma.service';
import { LoginController } from './login.controller';

@Module({
  controllers: [LoginController],
  providers: [AuthService, PrismaService, JwtService],
})
export class LoginModule {}
