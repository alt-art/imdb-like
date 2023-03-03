import { Prisma } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { IsValidPassword } from '../utils/validPassword';

export class UserCreateDto implements Prisma.UserCreateInput {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsValidPassword()
  @IsNotEmpty()
  password: string;
}

export class UserUpdateDto implements Prisma.UserUpdateInput {
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;
  @IsValidPassword()
  @IsNotEmpty()
  @IsOptional()
  password?: string;
}
