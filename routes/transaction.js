const handler = require("../handlers"),
  router = require("express").Router();

router.route("/addTransaction").post(handler.addTransaction);
router.route("/atlasSearchTransaction").post(handler.atlasSearchTransaction);
router.route("/defaultSearchTransaction").post(handler.defaultSearchTransaction);

module.exports = router;
