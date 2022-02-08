const handler = require("../handlers"),
  router = require("express").Router();

router.route("/addTransaction").post(handler.addTransaction);

module.exports = router;
