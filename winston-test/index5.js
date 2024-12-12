import winston from 'winston';

// 创建控制台传输器实例
const console = new winston.transports.Console();
// 创建文件传输器实例,设置日志文件名为test.log
const file = new winston.transports.File({ filename: 'test.log' });

// 创建一个新的日志记录器
const logger = winston.createLogger({
    level: 'debug',                    // 设置日志级别为debug
    format: winston.format.simple()    // 使用简单格式化输出
});

logger.clear();           // 清除所有传输器
logger.add(console);      // 添加控制台传输器
logger.remove(console);   // 移除控制台传输器
logger.add(file);         // 添加文件传输器

logger.info('光光光光光光光光光');
logger.error('东东东东东东东东');
logger.debug(66666666);