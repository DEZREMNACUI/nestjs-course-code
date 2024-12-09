import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 配置静态资源目录为 public 文件夹
  // 通过 /static 前缀访问静态资源
  app.useStaticAssets('public', {
    prefix: '/static',
  });
  await app.listen(3000);
}
bootstrap();
