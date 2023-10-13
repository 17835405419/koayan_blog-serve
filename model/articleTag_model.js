const mongoose = require("mongoose");

// 文章文档对象
const schema = new mongoose.Schema({
  tagId: {
    type: Number,
    default: Date.now,
    unique: true,
  },
  tagName: {
    type: String,
    required: true,
  },
  createTime: {
    type: Number,
    default: Date.now,
  },
});

const ArticleTags = mongoose.model("articleTags", schema);

module.exports = ArticleTags;
