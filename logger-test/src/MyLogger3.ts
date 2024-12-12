import { Inject } from '@nestjs/common';
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * MyLogger3 类继承自 ConsoleLogger
 * 用于自定义日志输出格式
 */
@Injectable()
export class MyLogger3 extends ConsoleLogger {
  /**
   * 注入 AppService 服务
   */
  @Inject(AppService)
  private appService: AppService;

  /**
   * 重写 log 方法
   * @param message 日志消息
   * @param context 日志上下文
   */
  log(message, context) {
    console.log(this.appService.getHello());
    console.log(`[${context}]`, message);
    console.log('--------------');
  }
}
