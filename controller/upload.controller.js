const path = require("path");
const fs = require("fs");
const { QINIU_CONFIG } = require("../config/config.Item"); //获取测试域名
const { qnUpload, qnDelete } = require("../utils/qiniu_upload.js"); //上传七牛云函数

class UploadController {
  // 上传文章图片
  async articleImg(ctx) {
    try {
      let paths = ctx.req.file.path;
      const key = path.basename(paths);
      const reader = fs.createReadStream(paths); //生成可读流文件
      const res = await qnUpload(`article_content_img/${key}`, reader);
      const imgUrl = QINIU_CONFIG.DOMAIN_NAME + res.key; //上传成功的图片地址
      if (imgUrl) {
        // 规定的 如果要在富文本中渲染 格式必须为该形式 否则需要前端设置
        ctx.body = {
          errno: 0, // 注意：值是数字，不能是字符串
          data: [
            {
              url: imgUrl,
              alt: "",
              href: "",
            },
          ],
        };
      }
      // 完成之后删除本地文件 这是同步删除 可以考虑换成异步
      fs.unlinkSync(paths);
    } catch (error) {
      ctx.body = {
        code: 1,
        err: error.message,
      };
    }
  }
  // 删除上传的文章图片
  async deleteArticleImg(ctx) {
    try {
      const { imgUrl } = ctx.request.query;
      const key = imgUrl.replace(QINIU_CONFIG.DOMAIN_NAME, "");
      await qnDelete(key);
      ctx.body = {
        code: 0,
        msg: "删除成功",
      };
    } catch (error) {
      ctx.body = {
        code: 1,
        err: error.message,
      };
    }
  }

  // 下载文件
  async downfiles(ctx) {
    try {
      const { url } = ctx.request.query;
      const key = url.replace(QINIU_CONFIG.DOMAIN_NAME, "");
      await qnDelete(key);
      ctx.body = {
        code: 0,
        msg: "下载成功",
      };
    } catch (error) {
      ctx.body = {
        code: 1,
        err: error.message,
      };
    }
  }
}

module.exports = new UploadController();
