import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 打印当前处理的 controller 和 handler
    console.log(context.getClass(), context.getHandler());

    // 记录开始时间
    const startTime = Date.now();

    // 调用下一个处理器,记录处理时间
    return next.handle().pipe(
      tap(() => {
        // 打印处理时间
        console.log('time: ', Date.now() - startTime);
      }),
    );
  }
}
