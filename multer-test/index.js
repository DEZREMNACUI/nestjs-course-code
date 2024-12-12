const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { MulterError } = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());

// 配置 multer 的磁盘存储选项
const storage = multer.diskStorage({
  // 设置文件存储目录
  destination: function (req, file, cb) {
    try {
      // 尝试创建上传目录,如果已存在则忽略错误
      fs.mkdirSync(path.join(process.cwd(), "my-uploads"));
    } catch (e) {}

    // 设置文件存储路径为 my-uploads 目录
    cb(null, path.join(process.cwd(), "my-uploads"));
  },
  // 设置文件名
  filename: function (req, file, cb) {
    // 生成唯一的文件名:时间戳-随机数-原始文件名
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname;
    // 返回 fieldname-唯一文件名 作为最终的文件名
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });

// 处理单个文件上传的路由
// 使用 upload.single() 中间件处理单个文件,字段名为 aaa
app.post("/aaa", upload.single("aaa"), function (req, res, next) {
  console.log("req.file", req.file); // 打印上传的文件信息
  console.log("req.body", req.body); // 打印请求体中的其他字段
});

// 处理多个文件上传的路由
// 使用 upload.array() 中间件处理最多2个文件,字段名为 bbb
app.post(
  "/bbb",
  upload.array("bbb", 2),
  function (req, res, next) {
    console.log("req.files", req.files); // 打印上传的多个文件信息
    console.log("req.body", req.body); // 打印请求体中的其他字段
  },
  // 错误处理中间件
  function (err, req, res, next) {
    if (err instanceof MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
      // 如果上传文件超过限制数量,返回400错误
      res.status(400).end("Too many files uploaded");
    } else {
      // 处理其他错误
      console.log(err);
      res.end("");
    }
  }
);

// 处理多个字段的多个文件上传的路由
// 使用 upload.fields() 中间件处理多个字段的文件上传
// aaa 字段最多上传3个文件,bbb 字段最多上传2个文件
app.post(
  "/ccc",
  upload.fields([
    { name: "aaa", maxCount: 3 },
    { name: "bbb", maxCount: 2 },
  ]),
  function (req, res, next) {
    console.log("req.files", req.files); // 打印上传的所有文件信息
    console.log("req.body", req.body); // 打印请求体中的其他字段
  }
);

// 处理任意文件上传的路由
// 使用 upload.any() 中间件处理任意数量和字段名的文件上传
// 注意:这种方式可能存在安全风险,建议谨慎使用
app.post("/ddd", upload.any(), function (req, res, next) {
  console.log("req.files", req.files); // 打印上传的所有文件信息
  console.log("req.body", req.body); // 打印请求体中的其他字段
});

console.log("server is running on http://localhost:3333");

app.listen(3333);
