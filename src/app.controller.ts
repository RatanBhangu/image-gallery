import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from 'lib/common/decorators';
import { LocalAuthGuard } from './auth/local/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly appService: AppService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('users/login')
  async login(@Req() req: any) {
    return this.authService.login(req.user);
  }
}
