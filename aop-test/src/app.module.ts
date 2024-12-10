import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogMiddleware } from './log.middleware';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: LoginGuard
    // },
    {
      provide: APP_INTERCEPTOR, // 注册全局拦截器
      useClass: TimeInterceptor,
    },
    {
      provide: APP_PIPE, // 注册全局管道
      useClass: ValidatePipe,
    },
    {
      provide: APP_FILTER, // 注册全局过滤器
      useClass: TestFilter,
    },
  ],
})
// 导出 AppModule 类，实现 NestModule 接口
export class AppModule implements NestModule {
  // 配置中间件
  configure(consumer: MiddlewareConsumer) {
    // 将 LogMiddleware 应用到以 aaa 开头的路由
    consumer.apply(LogMiddleware).forRoutes('aaa*');
  }
}
