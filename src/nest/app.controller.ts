import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './authguard/public.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Hello World',
    description: 'Returns a Hello World message',
  })
  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
