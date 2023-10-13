const router = require("koa-router")();
const {
  createArticleTag,
  getArticleTagList,
  deleteOneArticleTag,
} = require("../controller/articleTag_controller.js");

router.post("/createArticleTag", createArticleTag);
router.get("/getArticleTagList", getArticleTagList);
router.delete("/deleteOneArticleTag", deleteOneArticleTag);

module.exports = router;
