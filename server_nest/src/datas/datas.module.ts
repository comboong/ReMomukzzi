import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm'
import { Shops } from '../entity/shops.entity';
import { DatasService } from './datas.service';
import { DataController } from './datas.controller';
import { InjectBrowser } from 'nest-puppeteer';
import type { Browser } from 'puppeteer';
import { PuppeteerModule } from 'nest-puppeteer';


@Module({
  imports : [
      TypeOrmModule.forFeature([Shops]),
      PuppeteerModule.forRoot()
],
exports : [TypeOrmModule],
controllers: [DataController],
providers: [DatasService],
})

export class DatasModule {}
