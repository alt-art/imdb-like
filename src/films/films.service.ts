import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { FilmsCreateDto, FilmsUpdateDto } from './films.dto';

@Injectable()
export class FilmsService {
  constructor(private prismaService: PrismaService) {}

  async addFilm(data: FilmsCreateDto) {
    return this.prismaService.film.create({ data });
  }

  async getFilms() {
    return this.prismaService.film.findMany();
  }

  async getFilmById(id: number) {
    const film = await this.prismaService.film.findUnique({
      where: { id },
    });
    if (!film) {
      throw new HttpException('Film not found', HttpStatus.NOT_FOUND);
    }
    return film;
  }

  async updateFilm(id: number, data: FilmsUpdateDto) {
    return this.prismaService.film.update({
      where: { id },
      data,
    });
  }

  async deleteFilm(id: number) {
    return this.prismaService.film.delete({
      where: { id },
    });
  }
}
