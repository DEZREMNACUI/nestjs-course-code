# 使用最新版本的Node.js作为基础镜像
FROM node:latest

# 设置工作目录为/app
WORKDIR /app

# 将当前目录下的所有文件复制到容器的/app目录
COPY . .

# 全局安装http-server包
RUN npm install -g http-server

# 暴露8080端口
EXPOSE 8080

# 创建数据卷挂载点
VOLUME /app

# 启动http-server,监听8080端口
CMD ["http-server", "-p", "8080"]