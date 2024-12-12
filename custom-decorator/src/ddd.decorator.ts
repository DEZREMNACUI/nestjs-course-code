import { applyDecorators, Controller, SetMetadata } from '@nestjs/common';

/**
 * 组合装饰器,用于控制器
 * @param path - 控制器路径
 * @param metadata - 元数据
 * @returns 组合后的装饰器
 */
export const Ddd = (path, metadata) => {
  return applyDecorators(Controller(path), SetMetadata('ddd', metadata));
};
