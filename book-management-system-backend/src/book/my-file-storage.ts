import * as multer from 'multer';
import * as fs from 'fs';

// 创建一个 multer 磁盘存储配置
const storage = multer.diskStorage({
  // 配置文件保存的目标路径
  destination: function (req, file, cb) {
    try {
      // 尝试创建 uploads 目录
      fs.mkdirSync('uploads');
    } catch (e) {}

    // 设置保存路径为 uploads 目录
    cb(null, 'uploads');
  },
  // 配置文件名生成规则
  filename: function (req, file, cb) {
    // 生成唯一的文件名:时间戳-随机数-原始文件名
    const uniqueSuffix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      '-' +
      file.originalname;
    cb(null, uniqueSuffix);
  },
});

export { storage };
