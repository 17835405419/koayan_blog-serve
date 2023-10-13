const mongoose = require("mongoose");

// 文章文档对象
const schema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  content: {
    type: String,
  },
});

const webSoup = mongoose.model("webSoup", schema);

module.exports = webSoup;
