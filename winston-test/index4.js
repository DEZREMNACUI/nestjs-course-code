import winston from 'winston';
import 'winston-daily-rotate-file';

const logger = winston.createLogger({                // 创建一个新的日志记录器
    level: 'debug',                                 // 设置日志级别为debug
    format: winston.format.simple(),                // 使用简单格式化输出
    transports: [                                   // 配置传输器数组
        new winston.transports.Console(),           // 添加控制台传输器
        new winston.transports.Http({               // 添加HTTP传输器
            host: 'localhost',                      // 设置主机为localhost
            port: '3000',                           // 设置端口为3000
            path: '/log'                            // 设置日志路径为/log
        })
    ]
});                                                 // 结束配置对象

logger.info('光光光光光光光光光');
logger.error('东东东东东东东东');
logger.debug(66666666);