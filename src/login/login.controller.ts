import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { AuthService } from '../auth/auth.service';

export type RequestWithUser = Request & { user: User };

@Controller('login')
export class LoginController {
  constructor(private authService: AuthService) {}
  @Post()
  @UseGuards(AuthGuard('local'))
  async login(@Request() req: RequestWithUser) {
    return this.authService.login(req.user);
  }
}
