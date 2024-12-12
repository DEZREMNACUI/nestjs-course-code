import winston from 'winston';

const logger = winston.createLogger({                // 创建一个新的日志记录器
    level: 'debug',                                 // 设置日志级别为debug
    format: winston.format.simple(),                // 使用简单格式化输出
    transports: [                                   // 配置传输器数组
        new winston.transports.Console(),           // 添加控制台传输器
        new winston.transports.File({               // 添加文件传输器
            dirname: 'log', filename: 'test.log'    // 设置日志文件路径和名称
        }),
    ]
});                                                 // 结束配置对象

logger.info('光光光光光光光光光');
logger.error('东东东东东东东东');
logger.debug(66666666);