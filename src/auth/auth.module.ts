import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import app from '../config/app';
import { PrismaService } from '../prisma.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: app.appSecret,
    }),
  ],
  providers: [
    AuthService,
    PrismaService,
    JwtService,
    JwtStrategy,
    LocalStrategy,
  ],
})
export class AuthModule {}
