import {
  Module,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CccService } from './ccc.service';
import { CccController } from './ccc.controller';

@Module({
  controllers: [CccController],
  providers: [CccService],
})
export class CccModule
  implements
    OnModuleInit, // 模块初始化生命周期钩子
    OnApplicationBootstrap, // 应用启动生命周期钩子
    OnModuleDestroy, // 模块销毁生命周期钩子
    BeforeApplicationShutdown, // 应用关闭前生命周期钩子
    OnApplicationShutdown // 应用关闭时生命周期钩子
{
  constructor(private moduleRef: ModuleRef) {}

  // 模块销毁时调用
  onModuleDestroy() {
    console.log('CccModule onModuleDestroy');
  }

  // 应用关闭前调用
  beforeApplicationShutdown(signal: string) {
    console.log('CccModule beforeApplicationShutdown', signal);
  }

  // 应用关闭时调用
  onApplicationShutdown() {
    const cccService = this.moduleRef.get<CccService>(CccService);
    console.log('--------------------------', cccService.findAll());

    console.log('CccModule onApplicationShutdown');
  }

  // 模块初始化时调用
  onModuleInit() {
    console.log('CccModule OnModuleInit');
  }

  // 应用启动时调用
  onApplicationBootstrap() {
    console.log('CccModule onApplicationBootstrap');
  }
}
