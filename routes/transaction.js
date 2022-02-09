const handler = require("../handlers"),
  router = require("express").Router();

router.route("/addTransaction").post(handler.addTransaction);
router.route("/searchTransaction").post(handler.searchTransaction);

module.exports = router;
