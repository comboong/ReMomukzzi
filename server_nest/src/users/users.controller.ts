import { Body, Controller, Delete, Get, HttpCode, Patch, Post, Res } from '@nestjs/common';
import { create } from 'domain';
import { userInfo } from 'os';
import {UsersService} from './users.service';
import {signinDto} from './dto/user.dto'
import { Users } from './entity/users.entity';

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

    @Post('/users')
    signin(@Body() users : signinDto) { 
        return this.usersService.create_user(users)
    }

    @Patch('/users')
    patch_userinfo(@Body() users : signinDto) {
        return this.usersService.patch_userinfo(users);
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