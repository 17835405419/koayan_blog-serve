const Article = require("../model/article_model");
const paging = require("../utils/paging.js");

class ArticleService {
  async create(articleInfo) {
    // 发布文章
    try {
      await Article.create(articleInfo);
      return true;
    } catch (error) {
      throw {
        errName: "数据库错误",
        errorMessage: error.message,
      };
    }
  }
  async find(condition) {
    //查询文章
    // 如果是通过文章Id查找的话，该文章浏览量加一
    if (condition.articleId) {
      await Article.updateOne(
        { articleId: condition.articleId },
        { $inc: { read: 1 } }
      );
    }
    // 添加查询条件
    let query = {};
    condition.articleId &&
      Object.assign(query, { articleId: condition.articleId }); //文章id查找

    condition.title && Object.assign(query, { articleId: condition.title }); //文章标题查找

    condition.articlPartName &&
      Object.assign(query, { articlPartName: condition.articlPartName }); //分区查找

    condition.tagName &&
      Object.assign(query, {
        showTagList: { $elemMatch: { $eq: condition.tagName } },
      }); //标签查询
    //Todo 还可扩展 来源查找等等

    // 将查询条件添加至 codition中
    Object.assign(condition, { query });

    const articleInfo = await paging(Article, condition);
    if (articleInfo.count === 0) {
      throw {
        errName: "查询错误",
        errorMessage: "查询结果为空",
      };
    }
    return {
      code: 0,
      ...articleInfo,
    };
  }
  async deleteOne(condition) {
    const { articleId } = condition;

    const res = await Article.deleteOne({
      articleId: articleId,
    });
    if (res.deletedCount !== 0) {
      return true;
    }
    throw {
      errName: "删除错误",
      errorMessage: "删除失败",
    };
  }

  async search(condition) {
    // 搜索
    const { keyWords } = condition;
    // 添加查询条件
    const regex = new RegExp(keyWords, "i");
    let query = { title: { $regex: regex } };
    // 将查询条件添加至 codition中
    Object.assign(condition, { query });
    const res = await paging(Article, condition);
    if (res.count === 0) {
      throw {
        errName: "搜索错误",
        errorMessage: "查询结果为空",
      };
    }
    return {
      ...res,
    };
  }
}
module.exports = new ArticleService();
