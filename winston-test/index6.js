import winston from 'winston';

const logger = winston.createLogger({                // 创建一个新的日志记录器
    level: 'debug',                                 // 设置日志级别为debug
    format: winston.format.simple(),                // 使用简单格式化输出
    transports: [                                   // 配置传输器数组
        new winston.transports.Console()            // 添加控制台传输器
    ],
    rejectionHandlers: [                            // 配置未处理的Promise拒绝处理器
        new winston.transports.File({               // 添加文件传输器
            filename: 'rejection.log'               // 设置日志文件名为rejection.log
        })
    ]
});

(async function(){                                  // 定义一个异步立即执行函数
    throw Error('yyy');                            // 抛出一个错误
})();                                              // 立即执行该函数

logger.info('光光光光光光光光光');
logger.error('东东东东东东东东');
logger.debug(66666666);
