import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction, Request, Response } from 'express';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 注册全局中间件
  app.use(function (req: Request, res: Response, next: NextFunction) {
    // 打印请求前的日志
    console.log('before', req.url);
    // 调用下一个中间件
    next();
    // 打印请求后的日志
    console.log('after');
  });

  // app.useGlobalInterceptors(new TimeInterceptor())
  // app.useGlobalGuards(new LoginGuard())
  // app.useGlobalPipes(new ValidatePipe());
  // app.useGlobalFilters(new TestFilter());
  await app.listen(3000);
}
bootstrap();
