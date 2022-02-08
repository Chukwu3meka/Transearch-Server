const handler = require("../handlers"),
  router = require("express").Router();

router.route("/addCompany").post(handler.addCompany);
router.route("/getCompany").post(handler.getCompany);

module.exports = router;
