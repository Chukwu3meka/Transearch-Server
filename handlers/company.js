const { Company } = require("../models");
const { catchError } = require("../utils/serverFunctions");

exports.signup = async (req, res) => {
  try {
    const { title, password, email } = req.body;

    const emailTaken = await Company.findOne({ email });
    if (emailTaken) throw "Email taken";

    await Company.create({
      email,
      password,
      title,
      balance: 0,
    });

    res.status(200).json("success");
  } catch (err) {
    return catchError({ res, err, message: err });
  }
};

exports.signin = async (req, res) => {
  try {
    const { password, email } = req.body;
    const profile = await Company.findOne({ email });

    const validCredentials = await profile.comparePassword(password);
    if (!validCredentials) throw "invalid credentials";
    const { _id: id } = profile;

    res.status(200).json(id);
  } catch (err) {
    return catchError({ res, err, message: err });
  }
};

exports.getCompany = async (req, res) => {
  try {
    const { id } = req.body;

    const companyData = await Company.findOne({ _id: id });

    if (!companyData) throw "Company not found";

    const { balance, lastTransactions, title } = companyData;

    res.status(200).json({ balance, lastTransactions, title });
  } catch (err) {
    return catchError({ res, err, message: "unable to locate masses" });
  }
};
