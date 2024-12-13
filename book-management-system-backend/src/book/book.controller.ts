import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from './my-file-storage';
import * as path from 'path';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // 处理文件上传的接口
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      // 使用 FileInterceptor 拦截器处理文件上传,参数'file'对应表单中的字段名
      dest: 'uploads', // 上传目标目录
      storage: storage, // 使用自定义的存储配置
      limits: {
        fileSize: 1024 * 1024 * 3, // 限制文件大小为3MB
      },
      // 文件过滤器,用于验证上传的文件类型
      fileFilter(req, file, callback) {
        // 检查文件扩展名
        const extname = path.extname(file.originalname);
        // 只允许上传图片格式
        if (['.png', '.jpg', '.gif'].includes(extname)) {
          callback(null, true);
        } else {
          callback(new BadRequestException('只能上传图片'), false);
        }
      },
    }),
  )
  // 上传文件处理方法
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    return file.path; // 返回上传后的文件路径
  }

  // 获取图书列表的接口
  @Get('list')
  async list() {
    return this.bookService.list();
  }

  // 获取图书详情接口
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.bookService.findById(+id);
  }

  // 创建图书接口
  @Post('create')
  async create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  // 更新图书接口
  @Put('update')
  async update(@Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(updateBookDto);
  }

  // 删除图书接口
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.bookService.delete(+id);
  }
}
