import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller() //엔드포인트를 여기다 적어준다
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

  @Get('/hello')
  getHello(): string {
    return this.usersService.getHello();
  }

  @Post('/login')
  login(): string {
    return this.usersService.login();
  }
  
  @Get('/logout')
  logout() : string {
    return this.usersService.logout();
  }

  @Patch('/users')
  patch_userinfo(): string {
    return this.usersService.patch_userinfo();
  }

  @Get('/users')
  get_userinfo(): string {
    return this.usersService.get_userinfo();
  }

  @Delete('/users')
  delete_user(): string {
    return this.usersService.delete_user();
  }
}