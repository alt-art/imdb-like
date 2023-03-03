import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '@prisma/client';
import { Roles } from '../auth/roles.decorator';
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

  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN)
  @Post()
  addFilm(@Body() data: FilmsCreateDto) {
    return this.filmsService.addFilm(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  updateFilm(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: FilmsUpdateDto,
  ) {
    return this.filmsService.updateFilm(id, data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  deleteFilm(@Param('id', ParseIntPipe) id: number) {
    return this.filmsService.deleteFilm(id);
  }
}
