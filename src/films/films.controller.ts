import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { FilmsCreateDto, FilmsUpdateDto } from './films.dto';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private filmsService: FilmsService) {}

  @Get()
  getFilms() {
    return this.filmsService.getFilms();
  }

  @Get(':id')
  getFilmById(@Param('id', ParseIntPipe) id: number) {
    return this.filmsService.getFilmById(id);
  }

  @Post()
  addFilm(@Body() data: FilmsCreateDto) {
    return this.filmsService.addFilm(data);
  }

  @Patch(':id')
  updateFilm(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: FilmsUpdateDto,
  ) {
    return this.filmsService.updateFilm(id, data);
  }

  @Delete(':id')
  deleteFilm(@Param('id', ParseIntPipe) id: number) {
    return this.filmsService.deleteFilm(id);
  }
}
