import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  Optional,
  Inject,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MyValidationPipe implements PipeTransform<any> {
  // 注入可选的验证选项
  @Optional()
  @Inject('validation_options')
  private options;

  /**
   * 转换和验证输入值
   * @param value 需要验证的值
   * @param metatype 元数据类型
   * @returns 验证后的值
   */
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // 如果没有元数据类型,直接返回值
    if (!metatype) {
      return value;
    }
    // 打印验证选项
    console.log(this.options);
    // 将普通对象转换为类实例
    const object = plainToInstance(metatype, value);
    // 验证对象
    const errors = await validate(object);
    // 如果有错误则抛出异常
    if (errors.length > 0) {
      throw new BadRequestException('参数验证失败');
    }
    return value;
  }
}
