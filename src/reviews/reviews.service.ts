import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ReviewsCreateDto, ReviewsUpdateDto } from './reviews.dto';

@Injectable()
export class ReviewsService {
  constructor(private prismaService: PrismaService) {}

  async createReview(
    userId: number,
    { filmId, title, content, type }: ReviewsCreateDto,
  ) {
    const film = await this.prismaService.film.findUnique({
      where: { id: filmId },
    });
    if (!film) {
      throw new HttpException('Film not found', HttpStatus.NOT_FOUND);
    }
    return this.prismaService.review.create({
      data: {
        title,
        content,
        type,
        film: {
          connect: { id: filmId },
        },
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async getReviewsByFilmId(filmId: number) {
    const film = await this.prismaService.film.findUnique({
      where: { id: filmId },
    });
    if (!film) {
      throw new HttpException('Film not found', HttpStatus.NOT_FOUND);
    }
    return this.prismaService.review.findMany({
      where: { filmId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  async getReviewsByUserId(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.prismaService.review.findMany({
      where: { userId },
      include: { film: true },
    });
  }

  async deleteReview(userId: number, id: number) {
    const review = await this.prismaService.review.findUnique({
      where: { id },
    });
    if (!review) {
      throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
    }
    if (review.userId !== userId) {
      throw new HttpException(
        'You are not authorized to delete this review',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.prismaService.review.delete({
      where: { id },
    });
  }

  async updateReview(userId: number, id: number, data: ReviewsUpdateDto) {
    const review = await this.prismaService.review.findUnique({
      where: { id },
    });
    if (!review) {
      throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
    }
    if (review.userId !== userId) {
      throw new HttpException(
        'You are not authorized to update this review',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.prismaService.review.update({
      where: { id },
      data,
    });
  }

  async getReviewById(id: number) {
    const review = await this.prismaService.review.findUnique({
      where: { id },
      include: {
        film: true,
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    if (!review) {
      throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
    }
    return review;
  }
}
