import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  /**
   * 实现 NestMiddleware 接口的 use 方法
   * @param req Express 的 Request 对象
   * @param res Express 的 Response 对象
   * @param next 调用下一个中间件的函数
   */
  use(req: Request, res: Response, next: () => void) {
    // 记录请求进入时的日志
    console.log('before2', req.url);

    // 调用下一个中间件
    next();

    // 记录请求结束时的日志
    console.log('after2');
  }
}
