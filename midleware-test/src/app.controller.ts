import { Controller, Get, Next, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    console.log('hello');
    return this.appService.getHello();
  }

  @Get('hello2')
  getHello2(): string {
    console.log('hello2');
    return this.appService.getHello();
  }

  @Get('world1')
  getWorld1(): string {
    console.log('world1');
    return this.appService.getHello();
  }

  @Get('world2')
  getWorld2(): string {
    console.log('world2');
    return this.appService.getHello();
  }

  // 使用 @Next 装饰器注入 next 函数
  // 使用 @Response 装饰器注入 response 对象,并设置 passthrough 为 true
  @Get('aaa')
  a1(@Next() next, @Response({ passthrough: true }) response) {
    return 'hello';
  }

  // 使用 @Next 装饰器注入 next 函数
  // 调用 next() 后继续执行并返回 hello1
  @Get('bbb')
  b1(@Next() next) {
    next();
    return 'hello1';
  }

  @Get('bbb')
  b2() {
    return 'hello2';
  }
}
