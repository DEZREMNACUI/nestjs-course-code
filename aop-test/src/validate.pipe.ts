import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidatePipe implements PipeTransform {
  /**
   * 实现 PipeTransform 接口的 transform 方法
   * @param value 传入的参数值
   * @param metadata 参数的元数据,包含参数名等信息
   */
  transform(value: any, metadata: ArgumentMetadata) {
    // 尝试将参数转换为数字,如果转换失败则抛出异常
    if (Number.isNaN(parseInt(value))) {
      throw new BadRequestException(`参数${metadata.data}只能是字符串或者数字`);
    }

    // 如果参数本身是数字类型,直接乘以10
    // 如果是字符串类型,先转换为数字再乘以10
    return typeof value === 'number' ? value * 10 : parseInt(value) * 10;
  }
}
