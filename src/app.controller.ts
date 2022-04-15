import { Controller, Get,Request, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decoretor/public.decorator';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { AuthService } from './auth/service/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
