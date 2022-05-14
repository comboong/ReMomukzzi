import { Injectable } from '@nestjs/common';
import { Shops } from '../entity/shops.entity';
import {InjectRepository} from '@nestjs/typeorm'
import { InjectBrowser, InjectContext } from 'nest-puppeteer';
import type { Browser, } from 'puppeteer';
import type { BrowserContext } from 'puppeteer';
import {Repository} from 'typeorm'
// const cheerio = require("cheerio");
// const puppeteer = require("puppeteer");
import { scrollPageToBottom } from 'puppeteer-autoscroll-down';
// const { data } = require("cheerio/lib/api/attributes");


@Injectable()
export class DatasService {
    constructor(
        @InjectRepository(Shops)
        private usersRepository: Repository<Shops>,
        @InjectBrowser()
        private readonly browser: Browser,
        @InjectContext() 
        private readonly browserContext: BrowserContext
    ){}
    
    async getdata(body) {

        const page = await this.browserContext.newPage();
        await page.goto('http://place.map.kakao.com/1780387311');
        console.log(await page.content())
        


    }
}
