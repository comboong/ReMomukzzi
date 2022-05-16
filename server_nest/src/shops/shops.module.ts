import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule} from '@nestjs/typeorm'
import { Users } from '../entity/users.entity';
import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';



@Module({
    imports : [
        TypeOrmModule.forFeature([Users]),
        JwtModule.register({
            secret: '1234',
            signOptions: {expiresIn: '12h'},
        })
],
exports : [TypeOrmModule],
controllers: [ShopsController],
providers: [ShopsService],
})

export class ShopsModule {}
