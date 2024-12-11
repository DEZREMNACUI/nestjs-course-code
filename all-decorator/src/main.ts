import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 使用 session 中间件
  app.use(
    session({
      secret: 'guang', // session 加密的密钥
      cookie: { maxAge: 1000 }, // cookie 的过期时间,单位是毫秒
    }),
  );

  // 配置静态资源目录
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // 配置模板引擎的视图目录
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // 配置模板引擎为 handlebars
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
