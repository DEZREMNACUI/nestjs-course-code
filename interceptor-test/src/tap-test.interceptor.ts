import { AppService } from './app.service';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TapTestInterceptor implements NestInterceptor {
  constructor(private appService: AppService) {}

  // 创建一个logger实例用于记录日志，使用当前类名作为logger名称
  private readonly logger = new Logger(TapTestInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        // 这里是更新缓存的操作，这里模拟下
        this.appService.getHello();

        this.logger.log(`log something`, data);
      }),
    );
  }
}
