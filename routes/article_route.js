const {
  createArticle,
  getArticleInfo,
  getArticleList,
  deleteOneArticle,
  searchArticle,
} = require("../controller/article_controller.js");

const router = require("koa-router")();

router.post("/createArticle", createArticle);
router.get("/getArticleInfo", getArticleInfo);
router.get("/getArticleList", getArticleList);
router.delete("/deleteOneArticle", deleteOneArticle);
router.get("/searchArticle", searchArticle);

module.exports = router;
