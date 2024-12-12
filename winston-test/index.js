import winston from "winston";

winston.loggers.add("console", {                    // 添加一个名为console的日志记录器
  format: winston.format.combine(                   // 组合多个格式化器
    winston.format.colorize(),                      // 添加控制台颜色
    winston.format.simple()                         // 简单格式化输出
  ),
  transports: [new winston.transports.Console()],   // 使用控制台传输器
});

winston.loggers.add("file", {                      // 添加一个名为file的日志记录器
  format: winston.format.combine(                   // 组合多个格式化器
    winston.format.timestamp(),                     // 添加时间戳
    winston.format.json()                          // JSON格式化输出
  ),
  transports: [                                    // 配置传输器
    new winston.transports.File({                  // 使用文件传输器
      dirname: "log4",                             // 日志文件目录
      filename: "test.log",                        // 日志文件名
      format: winston.format.json(),               // JSON格式化输出
    }),
  ],
});

const logger1 = winston.loggers.get("console");

logger1.info("aaaaa");
logger1.error("bbbbb");

const logger2 = winston.loggers.get("file");

logger2.info("xxxx");
logger2.info("yyyy");
