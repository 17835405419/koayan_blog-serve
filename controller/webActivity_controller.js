const {
  findOneEnglish,
  findOneSoup,
} = require("../service/webActivity_service.js");
const axios = require("axios");
const { getRandomInt } = require("../utils/utils.js");
class WebActivityController {
  async getRandomEnglish(ctx) {
    try {
      // 获取随机数
      const num = getRandomInt(1, 1341);
      const res = await findOneEnglish({ wordRank: num });
      ctx.body = {
        code: 0,
        data: res,
      };
      return;
    } catch (error) {
      ctx.body = {
        code: 1,
        err: error,
      };
    }
  }
  async getRandomSoup(ctx) {
    try {
      // 获取随机数
      const num = getRandomInt(1, 235);
      const res = await findOneSoup({ id: num });
      ctx.body = {
        code: 0,
        data: res,
      };
      return;
    } catch (error) {
      ctx.body = {
        code: 1,
        err: error,
      };
    }
  }
  async wordAudioPlay(ctx) {
    const { params } = ctx.query;

    try {
      const response = await axios.get(
        `https://dict.youdao.com/dictvoice?audio=${params}`,
        {
          responseType: "arraybuffer", // 设置响应类型为arraybuffer
        }
      );

      // response.data 包含响应的ArrayBuffer数据
      const arrayBuffer = response.data;
      ctx.body = {
        code: 0,
        data: arrayBuffer,
      };
      // 在这里你可以处理 arrayBuffer，比如传递给Web Audio API解码音频数据
    } catch (error) {
      ctx.body = {
        code: 1,
        err: error.message,
      };
    }
  }
}

module.exports = new WebActivityController();
