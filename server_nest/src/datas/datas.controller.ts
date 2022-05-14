import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { DatasService } from "./datas.service"

@Controller()
export class DataController {
    constructor(private readonly datasService: DatasService) {}

    @Post('/getdata')
    getdata(@Body() body, @Res() res) {
        return this.datasService.getdata(body);
    }
}
