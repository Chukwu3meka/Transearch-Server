const { Company } = require("../models");
const { catchError, ordinalSuffix } = require("../utils/serverFunctions");

exports.addCompany = async (req, res) => {
  try {
    res.status(200).json("success");
  } catch (err) {
    return catchError({ res, err, message: "unable to locate masses" });
  }
};

exports.getCompany = async (req, res) => {
  try {
    const { name } = req.body;

    const companyData = await Company.findOne({ name });
    if (!companyData) throw "Company not found";

    const { balance, lastTransactions } = companyData;

    res.status(200).json({ balance, lastTransactions });
  } catch (err) {
    return catchError({ res, err, message: "unable to locate masses" });
  }
};
