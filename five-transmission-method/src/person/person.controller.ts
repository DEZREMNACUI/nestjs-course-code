import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreatePersonDto } from './dto/create-person.dto';

@Controller('api/person')
export class PersonController {
  @Get('find')
  query(@Query('name') name: string, @Query('age') age: number) {
    return `received: name=${name},age=${age}`;
  }

  @Get(':id')
  urlParam(@Param('id') id: string) {
    return `received: id=${id}`;
  }

  @Post()
  body(@Body() createPersonDto: CreatePersonDto) {
    return `received: ${JSON.stringify(createPersonDto)}`;
  }

  @Post('file') // 处理文件上传的POST请求装饰器
  @UseInterceptors(
    // 使用拦截器装饰器
    AnyFilesInterceptor({
      // 任意文件拦截器配置
      dest: 'uploads', // 上传文件保存目录
    }),
  )
  body2(
    // 处理文件上传的控制器方法
    @Body() createPersonDto: CreatePersonDto, // 获取请求体中的数据
    @UploadedFiles() files: Array<Express.Multer.File>, // 获取上传的文件数组
  ) {
    console.log(files); // 打印上传的文件信息
    return `received: ${JSON.stringify(createPersonDto)}`; // 返回接收到的数据
  }
}
