const {
  create,
  find,
  search,
  deleteOne,
} = require("../service/article_service.js");

class ArticleController {
  async createArticle(ctx) {
    // 发布文章
    try {
      const articleInfo = ctx.request.body;
      //Todo 需要做数据验证 以后弄
      const res = await create(articleInfo);
      if (res === true) {
        ctx.body = {
          code: 0,
          msg: "文章发布成功",
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
  async getArticleInfo(ctx) {
    try {
      const { articleId } = ctx.query;
      if (!articleId) {
        ctx.body = {
          code: 1,
          err: {
            errName: "参数错误",
            errorMessage: "文章ID为必传",
          },
        };
        return;
      }
      const res = await find({ articleId });
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
  async getArticleList(ctx) {
    try {
      const condition = ctx.query;
      const res = await find(condition);
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
  async deleteOneArticle(ctx) {
    try {
      const { articleId } = ctx.query;
      const res = await deleteOne({ articleId });
      if (res === true) {
        ctx.body = {
          code: 0,
          msg: "删除文章成功",
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
  async searchArticle(ctx) {
    try {
      const { keyWords } = ctx.query;
      if (!keyWords) {
        ctx.body = {
          code: 1,
          err: {
            errName: "参数错误",
            errorMessage: "搜索关键词为必传",
          },
        };
        return;
      }
      const res = await search(ctx.query);
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
}
module.exports = new ArticleController();
