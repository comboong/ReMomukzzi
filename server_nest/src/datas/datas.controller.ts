import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { DatasService } from "./datas.service"

@Controller()
export class DataController {
    constructor(private readonly datasService: DatasService) {}

    @Post('/getdata')
    async getdata(@Body() body, @Res() res) {
        return res.json(await this.datasService.getdata(body));
    }
}