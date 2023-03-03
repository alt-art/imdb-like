import { Module } from '@nestjs/common';
import { FilmsModule } from './films/films.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [FilmsModule],
  providers: [PrismaService],
})
export class AppModule {}
