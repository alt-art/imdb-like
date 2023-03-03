import { Module } from '@nestjs/common';
import { FilmsModule } from './films/films.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [FilmsModule, AuthModule, UsersModule, ReviewsModule],
  providers: [PrismaService],
})
export class AppModule {}
