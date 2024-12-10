import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class TestFilter implements ExceptionFilter {
  // 实现 ExceptionFilter 接口的 catch 方法
  catch(exception: BadRequestException, host: ArgumentsHost) {
    // 从 ArgumentsHost 获取 Response 对象
    const response: Response = host.switchToHttp().getResponse();

    // 返回 400 状态码和自定义错误信息
    // 这里在原始错误信息前加上 'test:' 前缀
    response.status(400).json({
      statusCode: 400,
      message: 'test: ' + exception.message,
    });
  }
}
