import { Module } from '@nestjs/common';
import { FilmsModule } from './films/films.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [FilmsModule, AuthModule, UsersModule],
  providers: [PrismaService],
})
export class AppModule {}
