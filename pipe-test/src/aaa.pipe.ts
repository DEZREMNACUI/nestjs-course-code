import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

/**
 * AaaPipe 是一个管道转换类
 * 实现了 PipeTransform 接口
 */
@Injectable()
export class AaaPipe implements PipeTransform {
  /**
   * 转换方法
   * @param value 需要转换的值
   * @param metadata 元数据信息
   * @returns 返回字符串 'aaa'
   */
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value, metadata);
    return 'aaa';
  }
}
