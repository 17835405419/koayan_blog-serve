const ArticleTag = require("../model/articleTag_model.js");
const paging = require("../utils/paging.js");
class ArticleTagService {
  async create(tagInfo) {
    // 发布文章

    const res = await ArticleTag.find({ tagName: tagInfo.tagName });
    if (res.length !== 0) {
      throw {
        errName: "创建错误",
        errorMessage: "该数据已存在",
      };
    }
    await ArticleTag.create(tagInfo);
    return true;
  }

  async find(condition) {
    const res = await paging(ArticleTag, condition);
    if (res.count === 0) {
      throw {
        errName: "查询错误",
        errorMessage: "查询结果为空",
      };
    }
    return {
      ...res,
    };
  }

  async deleteOne(condition) {
    const { tagId } = condition;
    const res = await ArticleTag.deleteOne({
      tagId: tagId,
    });
    if (res.deletedCount !== 0) {
      return true;
    }
    throw {
      errName: "删除错误",
      errorMessage: "删除失败",
    };
  }
}

module.exports = new ArticleTagService();
