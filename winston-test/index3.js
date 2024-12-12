import winston from 'winston';
import 'winston-daily-rotate-file';

const logger = winston.createLogger({                // 创建一个新的日志记录器
    level: 'debug',                                 // 设置日志级别为debug
    format: winston.format.simple(),                // 使用简单格式化输出
    transports: [                                   // 配置传输器数组
        new winston.transports.Console(),           // 添加控制台传输器
        new winston.transports.DailyRotateFile({    // 添加按日期轮转的文件传输器
            level: 'info',                          // 设置该传输器的日志级别为info
            dirname: 'log2',                        // 设置日志文件目录
            filename: 'test-%DATE%.log',            // 设置日志文件名格式
            datePattern: 'YYYY-MM-DD',        // 设置日期格式
            maxSize: '1k'                           // 设置单个日志文件最大大小为1KB
        })
    ]
});

logger.info('光光光光光光光光光');
logger.error('东东东东东东东东');
logger.debug(66666666);