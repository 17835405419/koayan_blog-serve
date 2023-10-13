const {
  getRandomEnglish,
  getRandomSoup,
  wordAudioPlay,
} = require("../controller/webActivity_controller");

const router = require("koa-router")();

router.get("/getRandomEnglish", getRandomEnglish);
router.get("/getRandomSoup", getRandomSoup);
router.get("/wordAudioPlay", wordAudioPlay);

module.exports = router;
