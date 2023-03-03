import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { AuthService } from '../auth/auth.service';
import { UserCreateDto } from './users.dto';
import { UsersService } from './users.service';

export type RequestWithUser = Request & { user: User };

@Controller('users')
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req: RequestWithUser) {
    return this.authService.login(req.user);
  }

  @Post()
  async createUser(@Body() data: UserCreateDto) {
    return this.usersService.createUser(data);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUser(@Request() req: RequestWithUser) {
    return this.usersService.getUser(req.user.id);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @Request() req: RequestWithUser,
    @Body() data: UserCreateDto,
  ) {
    return this.usersService.updateUser(req.user.id, data);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Request() req: RequestWithUser) {
    return this.usersService.deleteUser(req.user.id);
  }
}
