import { LocalAuthGuard } from './local-auth.guard';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  createUser(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.createUser(email, password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: Request) {
    return this.authService.login(request.user);
  }
}
