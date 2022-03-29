import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  createUser(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.createUser(email, password);
  }
}
