import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule} from '@nestjs/typeorm'
import { Users } from './entity/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports : [
        TypeOrmModule.forFeature([Users]),
        JwtModule.register({
            secret: '1234',
            signOptions: {expiresIn: '12h'},
        })
    ],
    exports : [TypeOrmModule],
    controllers: [UsersController],
    providers: [UsersService],
})

export class UsersModule {}
