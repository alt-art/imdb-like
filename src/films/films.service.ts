import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { calculatePopularity, calculateRating } from '../utils/ranking';
import { FilmsCreateDto, FilmsGetParamsDto, FilmsUpdateDto } from './films.dto';

@Injectable()
export class FilmsService {
  constructor(private prismaService: PrismaService) {}

  async addFilm({ title, director, launchDate }: FilmsCreateDto) {
    return this.prismaService.film.create({
      data: { title, director, launchDate: new Date(launchDate) },
    });
  }

  async getFilms({ noReview }: FilmsGetParamsDto) {
    const films = await this.prismaService.film.findMany({
      include: { reviews: true },
    });
    return films
      .filter((film) => {
        if (noReview === 'true') {
          return film.reviews.length === 0;
        }
        return true;
      })
      .map((film) => {
        // remove reviews from film
        return {
          ...film,
          reviews: undefined,
        };
      });
  }

  async getFilmById(id: number) {
    const film = await this.prismaService.film.findUnique({
      where: { id },
      include: { reviews: true },
    });
    if (!film) {
      throw new HttpException('Film not found', HttpStatus.NOT_FOUND);
    }
    const { reviews } = film;
    return {
      ...film,
      popularity: calculatePopularity(reviews, film.launchDate),
      rating: calculateRating(reviews),
    };
  }

  async updateFilm(
    id: number,
    { title, director, launchDate }: FilmsUpdateDto,
  ) {
    return this.prismaService.film.update({
      where: { id },
      data: { title, director, launchDate: launchDate && new Date(launchDate) },
    });
  }

  async deleteFilm(id: number) {
    return this.prismaService.film.delete({
      where: { id },
    });
  }
}
