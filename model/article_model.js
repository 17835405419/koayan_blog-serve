const mongoose = require("mongoose");

// 文章文档对象
const schema = new mongoose.Schema({
  articleId: {
    type: Number,
    unique: true,
    default: Date.now,
  }, //文章Id
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  }, //内容
  stemfrom: {
    type: String,
    required: true,
  }, //来源
  articlPartName: {
    type: String,
    default: "",
  }, //分区
  showTagList: {
    type: Array,
    default: [],
  }, //标签列表
  articleImg: {
    type: String,
    default: "",
  }, //文章封面图片
  createTime: {
    type: Number,
    default: Date.now,
  }, //创建时间

  articleState: {
    type: Number,
    default: 0,
  }, //文章状态  0正常 1封禁 2待审核
  read: {
    type: Number,
    default: 0,
  }, //阅读量
});
schema.index({ title: "text" }, { default_language: "none" });
const Article = mongoose.model("articles", schema);

module.exports = Article;
