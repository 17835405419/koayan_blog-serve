const fs = require("fs");
const path = require("path");
const router = require("koa-router")();
const multer = require("koa-multer");

const {
  articleImg,
  deleteArticleImg,
  downfiles,
} = require("../controller/upload.controller"); //获取上传控制层

//设置文件存储位置
let storage = multer.diskStorage({
  //  动态创建 防止集中在一个文件夹不利于后期维护
  destination: function (req, file, cb) {
    console.log(file);
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDay();
    let dir = `public/uploads/${file.fieldname}/` + year + month + day;

    // 判断该文件夹是否存在
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true,
      });
    }
    //将文件上传到目录
    cb(null, dir);
  },
  // 设置上传的文件名称
  filename: function (req, file, cb) {
    // filedname文件原来的名称+时间戳+文件的后缀名
    let fileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});
let upload = multer({ storage: storage });

// 上传文章图片
router.post("/uploadArticleImg", upload.single("articleImg"), articleImg);
// 删除上传的文章图片
router.delete("/deleteArticleImg", deleteArticleImg);
// 下载文件
router.get("/downFiles", downfiles);

module.exports = router;
