const handler = require("../handlers"),
  router = require("express").Router();

router.route("/signup").post(handler.signup);
router.route("/signin").post(handler.signin);
router.route("/getCompany").post(handler.getCompany);

module.exports = router;
