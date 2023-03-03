import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from '../users/users.controller';
import { ReviewsCreateDto, ReviewsUpdateDto } from './reviews.dto';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get('film/:filmId')
  getReviewsByFilmId(@Param('filmId', ParseIntPipe) filmId: number) {
    return this.reviewsService.getReviewsByFilmId(filmId);
  }

  @Get('user/:userId')
  getReviewsByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.reviewsService.getReviewsByUserId(userId);
  }

  @Get(':id')
  getReviewById(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.getReviewById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createReview(
    @Body() data: ReviewsCreateDto,
    @Request() req: RequestWithUser,
  ) {
    return this.reviewsService.createReview(req.user.id, data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  updateReview(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ReviewsUpdateDto,
    @Request() req: RequestWithUser,
  ) {
    return this.reviewsService.updateReview(req.user.id, id, data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteReview(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: RequestWithUser,
  ) {
    return this.reviewsService.deleteReview(req.user.id, id);
  }
}
