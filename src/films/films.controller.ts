import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '@prisma/client';
import { Roles } from '../auth/roles.decorator';
import { FilmsCreateDto, FilmsGetParamsDto, FilmsUpdateDto } from './films.dto';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private filmsService: FilmsService) {}

  @Get()
  getFilms(@Query() params: FilmsGetParamsDto) {
    return this.filmsService.getFilms(params);
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
