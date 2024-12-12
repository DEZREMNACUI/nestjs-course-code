import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface CccModuleOptions {
  aaa: number;
  bbb: string;
}

export const {
  ConfigurableModuleClass, // 可配置模块类
  MODULE_OPTIONS_TOKEN, // 模块选项令牌
  OPTIONS_TYPE, // 选项类型
  ASYNC_OPTIONS_TYPE, // 异步选项类型
} = new ConfigurableModuleBuilder<CccModuleOptions>() // 创建可配置模块构建器
  .setClassMethodName('register') // 设置类方法名为register
  .setExtras(
    {
      isGlobal: true, // 设置全局标志为true
    },
    (definition, extras) => ({
      // 定义扩展配置转换函数
      ...definition, // 展开原有定义
      global: extras.isGlobal, // 设置global属性为isGlobal的值
    }),
  )
  .build(); // 构建模块
