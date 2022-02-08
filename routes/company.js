const handler = require("../handlers"),
  router = require("express").Router();

router.route("/addCompany").post(handler.addCompany);

module.exports = router;
