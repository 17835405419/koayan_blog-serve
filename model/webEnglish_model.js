const mongoose = require("mongoose");

// 文章文档对象
const schema = new mongoose.Schema({
  wordRank: {
    type: Number,
  },
  headWord: {
    type: String,
  },
  wordId: {
    type: String,
    unique: true,
    required: true,
  },
  ukphone: {
    type: String,
  },
  ukspeech: {
    type: String,
  },
  trans: {
    type: Array,
  },
  phrase: {
    type: Object,
  },
  sentence: {
    type: Object,
  },
});

const webEnglish = mongoose.model("webEnglish", schema);

module.exports = webEnglish;
