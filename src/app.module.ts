import { Module } from '@nestjs/common';
import { FilmsModule } from './films/films.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [FilmsModule, AuthModule, LoginModule],
  providers: [PrismaService],
})
export class AppModule {}
