import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 从请求中提取版本号的函数
  const extractor = (request: Request) => {
    // 如果请求头中包含 disable-custom,返回空数组
    if (request.headers['disable-custom']) {
      return [];
    }
    // 如果 url 中包含 guang 返回版本号 2,否则返回版本号 1
    return request.url.includes('guang') ? '2' : '1';
  };

  // 启用版本控制
  app.enableVersioning({
    // 使用 HEADER 方式进行版本控制,通过 version header 指定版本
    // type: VersioningType.HEADER,
    // header: 'version'

    // 使用 Media Type 方式进行版本控制,通过 vv= 参数指定版本
    // type: VersioningType.MEDIA_TYPE,
    // key: 'vv='

    // 使用 URI 方式进行版本控制,通过 url 路径指定版本
    // type: VersioningType.URI

    // 使用自定义方式进行版本控制,通过 extractor 函数提取版本号
    type: VersioningType.CUSTOM,
    extractor,
  });

  await app.listen(3000);
}

bootstrap();
