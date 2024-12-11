import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

/**
 * 权限守卫
 */
@Injectable()
export class AaaGuard implements CanActivate {
  /**
   * 注入 Reflector,用于获取元数据
   */
  @Inject(Reflector)
  private readonly reflector: Reflector;

  /**
   * 守卫方法,判断是否可以访问路由
   * @param context 执行上下文
   * @returns 是否可以访问
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('guang');

    // 获取类的 roles 元数据
    const classMetadata = this.reflector.get('roles', context.getClass());
    // 获取方法的 roles 元数据 
    const methodMetadata = this.reflector.get('roles', context.getHandler());

    console.log(classMetadata, methodMetadata);

    return true;
  }
}
