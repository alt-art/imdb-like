import { Prisma } from '@prisma/client';
import {
  IsDecimal,
  IsInt,
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

  @IsInt()
  @IsNotEmpty()
  year: number;
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

  @IsDecimal()
  @IsNotEmpty()
  @IsOptional()
  year?: number;
}
