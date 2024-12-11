import { Inject } from '@nestjs/common';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AaaInterceptor implements NestInterceptor {
  @Inject(Reflector)
  private reflector: Reflector;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('interceptor');

    console.log(this.reflector.get('roles', context.getHandler()));
    console.log(this.reflector.get('roles', context.getClass()));

    console.log(
      'getAll',
      // 获取所有 roles 元数据
      // 返回一个数组,包含 handler 和 class 上的所有 roles 值
      this.reflector.getAll('roles', [
        context.getHandler(),
        context.getClass(),
      ]),
    );
    console.log(
      'getAllAndMerge',
      // 合并 handler 和 class 上的 roles 元数据
      // 返回一个数组,包含所有不重复的 roles 值
      this.reflector.getAllAndMerge('roles', [
        context.getHandler(),
        context.getClass(),
      ]),
    );
    console.log(
      'getAllAndOverride',
      // 获取 handler 和 class 上的 roles 元数据
      // 优先使用 handler 上的值,如果没有则使用 class 上的值
      this.reflector.getAllAndOverride('roles', [
        context.getHandler(),
        context.getClass(),
      ]),
    );

    return next.handle();
  }
}
