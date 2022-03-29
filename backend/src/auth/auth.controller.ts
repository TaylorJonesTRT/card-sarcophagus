import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  createUser(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.createUser(email, password);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() request: Request) {
    return request.user;
  }
}
