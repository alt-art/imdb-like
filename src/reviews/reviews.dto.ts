import { ReviewType } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class ReviewsCreateDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsEnum(ReviewType)
  @IsNotEmpty()
  type: ReviewType;

  @IsInt()
  @IsNotEmpty()
  filmId: number;
}

export class ReviewsUpdateDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content?: string;

  @IsEnum(ReviewType)
  @IsNotEmpty()
  @IsOptional()
  type?: ReviewType;
}
