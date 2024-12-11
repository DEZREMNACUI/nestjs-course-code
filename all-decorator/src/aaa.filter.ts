import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

// 使用 @Catch 装饰器捕获 HttpException 类型的异常
@Catch(HttpException)
// 实现 ExceptionFilter 接口的异常过滤器
export class AaaFilter implements ExceptionFilter {
  // 处理捕获到的异常
  catch(exception: HttpException, host: ArgumentsHost) {
    // 获取响应对象
    const response: Response = host.switchToHttp().getResponse();
    // 设置响应状态码和返回的错误信息
    response.status(exception.getStatus()).json({
      msg: exception.message,
    });
  }
}
