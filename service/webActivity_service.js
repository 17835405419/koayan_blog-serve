const WebEnglish = require("../model/webEnglish_model.js");
const WebSoup = require("../model/webSoup_model.js");

class WebActivityService {
  async findOneEnglish(condition) {
    const { wordRank } = condition;
    const res = await WebEnglish.find({ wordRank: wordRank });
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
  async findOneSoup(condition) {
    const { id } = condition;
    const res = await WebSoup.find({ id: id });
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
}

module.exports = new WebActivityService();
