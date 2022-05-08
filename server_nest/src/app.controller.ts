import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/login')
  login(): string {
    return this.appService.login();
  }
  
  @Get('/logout')
  logout() : string {
    return this.appService.logout();
  }

  

  @Patch('/users')
  patch_userinfo(): string {
    return this.appService.patch_userinfo();
  }

  @Get('/users')
  get_userinfo(): string {
    return this.appService.get_userinfo();
  }

  @Delete('/users')
  delete_user(): string {
    return this.appService.delete_user();
  }
}
