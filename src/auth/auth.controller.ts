import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    // First validate the user using the email and password
    const user = await this.authService.login(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // If validation is successful, return the JWT token
    return user; // Returns the JWT token from the login method in AuthService
  }
}
