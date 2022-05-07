import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users } from './entity/users.entity';
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import { signinDto } from './dto/user.dto';

@Injectable()
export class UsersService {
        constructor(
            @InjectRepository(Users)
            private usersRepository: Repository<Users>,
        ){}

    getHello(): string {
        return 'Hello World!';
    }

    login(): string {
        
        return 'login function work!'
    }

    logout() : string { 
        return 'logout function work!'
    }

    async create_user(Users : signinDto) : Promise <String> {
        const check_id = await this.usersRepository.findOne({user_id : Users.user_id})
        const check_email = await this.usersRepository.findOne({email : Users.email})

        if(check_id){
            throw new HttpException('아이디가 이미 사용 중입니다.', HttpStatus.BAD_REQUEST)
        }else if(check_email){
            throw new HttpException('이메일이 이미 사용 중입니다.', HttpStatus.BAD_REQUEST)
        }else{
            await this.usersRepository.save(Users)
        
            return 'create_user work!'
        }

    }

    async patch_userinfo(Users : signinDto) : Promise <String> {
    try{
        const update = await this.usersRepository.findOne({user_id : Users.user_id})
        update.email = Users.email;
        update.nickname = Users.nickname;
        update.oauth = Users.oauth;
        update.password = Users.password;
    
        const updated = await this.usersRepository.save(update)
        if(update){
        return '유저 정보가 변경되었습니다.'
        }else{
        throw new HttpException('유저 정보가 변경되지 않았습니다.', HttpStatus.BAD_REQUEST)
    }}
    catch(err){
        throw new HttpException('오류가 발생했습니다.', HttpStatus.BAD_REQUEST)
        }
    }

    get_userinfo() : string {
        return "get_userinfo work!"
    }

    delete_user() : string {
        return "delete_user work!"
    }
}
