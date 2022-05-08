import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsersService} from './users/users.service'
import { UsersController} from './users/users.controller'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/entity/users.entity';
import {UsersModule} from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'Remomukzzi',
    entities: [Users],
    synchronize: true,
  }),
  UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
