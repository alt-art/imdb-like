import { Prisma } from '@prisma/client';
import {
  IsBooleanString,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class FilmsCreateDto implements Prisma.FilmCreateInput {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsDateString()
  @IsNotEmpty()
  launchDate: string | Date;
}

export class FilmsUpdateDto implements Prisma.FilmUpdateInput {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  director?: string;

  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  launchDate?: string;
}

export class FilmsGetParamsDto {
  @IsBooleanString()
  @IsNotEmpty()
  @IsOptional()
  noReview?: string;
}
