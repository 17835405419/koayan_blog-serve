const { create, find, deleteOne } = require("../service/articleTag_service.js");
class ArticleTagController {
  async createArticleTag(ctx) {
    try {
      const { tagName } = ctx.request.body;
      const res = await create({ tagName });
      if (res === true) {
        ctx.body = {
          code: 0,
          mag: "新增标签成功",
        };
        return;
      }
    } catch (error) {
      ctx.body = {
        code: 1,
        err: error,
      };
    }
  }
  async getArticleTagList(ctx) {
    try {
      const condtion = ctx.query;
      const res = await find(condtion);
      ctx.body = {
        code: 0,
        data: res,
      };
    } catch (error) {
      ctx.body = {
        code: 1,
        err: error,
      };
    }
  }
  async deleteOneArticleTag(ctx) {
    try {
      const { tagId } = ctx.query;
      const res = await deleteOne({ tagId });
      if (res === true) {
        ctx.body = {
          code: 0,
          msg: "删除标签成功",
        };
        return;
      }
    } catch (error) {
      ctx.body = {
        code: 1,
        err: error,
      };
    }
  }
}

module.exports = new ArticleTagController();
