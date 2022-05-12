import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsersService} from './users/users.service'
import { UsersController} from './users/users.controller'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Shops } from './entity/shops.entity';
import { Articles} from './entity/article.entity';
import { Menu } from  './entity/menu.entity';
import { Review } from './entity/review.entity';
import { Shop_pic} from './entity/shopPic.entity';
import { Tag } from './entity/tag.entity';
import { Review_pic} from './entity/review_pic.entity';
import { Bookmark } from './entity/bookmark.entity';

import {UsersModule} from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'Remomukzzi',
    entities: [Users,Shops,Articles,Menu,Review,Shop_pic,Tag,Review_pic,Bookmark],
    synchronize: true,
  }),
  UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
