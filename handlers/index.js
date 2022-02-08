module.exports = {
  ...require("./transaction"),
  ...require("./company"),
};

// module.exports.error = (err, req, res, next) => {
//   return res.status(err.status || 500).json(err.message || err || "something went wrong.");
// };
