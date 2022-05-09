import { Body, Controller, Delete, Get, Patch, Post, Res, Req,  } from '@nestjs/common';
import {UsersService} from './users.service';
import {signinDto,userloginDto} from './dto/user.dto'
import { Response, Request } from 'express';


@Controller() //엔드포인트를 여기다 적어준다
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/hello')
    getHello(): string {
        return this.usersService.getHello();
    }

    @Post('/login')
    async login(@Body() user: userloginDto, @Res() res: Response): Promise<any> {
        const jwt = await this.usersService.login(user);
        res.setHeader('Authorization', 'Bearer '+jwt.accessToken);
        return res.json({
            message: "Login success!",
            data: {
                accessToken : jwt.accessToken
            },
        })
    }

    @Post('/logout')
    logout(@Req() req: Request, @Res() res: Response): any {
        return this.usersService.logout(req,res)
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
    async delete_user(@Req() header : Request ): Promise<any> {
        return this.usersService.delete_user(header);
    }
}