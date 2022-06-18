import {  Body, Controller, Delete, Get, Patch, Post, Res, Req, Param } from '@nestjs/common';
import { ShopsService } from './shops.service';

@Controller('shops')
export class ShopsController {
    constructor(private readonly shopsService : ShopsService) {}
    
    @Get(':id')
    getHello(@Param('id') shopid : Number): any {
        return this.shopsService.getShopInfo(shopid);
    }
}
