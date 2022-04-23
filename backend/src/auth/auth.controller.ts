import { LocalAuthGuard } from './local-auth.guard';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.authService.createUser(username, password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: Request) {
    return this.authService.login(request.user);
  }
}
