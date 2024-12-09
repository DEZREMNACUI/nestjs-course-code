import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

// 描述 AppController 的端到端测试
describe('AppController (e2e)', () => {
  // 声明 app 变量用于存储应用实例
  let app: INestApplication;

  // 每个测试用例执行前的准备工作
  beforeEach(async () => {
    // 创建测试模块
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // 导入 AppModule
    }).compile();

    // 创建应用实例
    app = moduleFixture.createNestApplication();
    // 初始化应用
    await app.init();
  });

  // 测试 GET / 路由
  it('/ (GET)', () => {
    return request(app.getHttpServer()) // 创建 HTTP 请求
      .get('/') // 发送 GET 请求到根路径
      .expect(200) // 期望返回状态码 200
      .expect('Hello World!'); // 期望返回内容为 Hello World!
  });
});
