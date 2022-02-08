const { Transaction } = require("../models");
const { catchError, ordinalSuffix } = require("../utils/serverFunctions");

exports.addCompany = async (req, res) => {
  try {
    const { title, amount, description, credit } = req.body;

    const dateReplacer = () => {
      let fullTextDate = new Date().toDateString();

      for (const [key, val] of Object.entries({
        Jan: "January",
        Feb: "February",
        Mar: "March",
        Apr: "April",
        Jun: "June",
        Jul: "July",
        Aug: "August",
        Sep: "September",
        Oct: "October",
        Nov: "November",
        Dec: "December",

        Mon: "Monday",
        Tue: "Tuesday",
        Wed: "Wednesday",
        Thu: "Thursday",
        Fri: "Friday",
        Sat: "Saturday",
        Sun: "Sunday",
      })) {
        fullTextDate = fullTextDate.replace(key, val);
      }

      return `${fullTextDate.toLowerCase()} ${ordinalSuffix(new Date().getDay())}`;
    };

    await Transaction.create({
      title,
      amount,
      description,
      credit,
      date: {
        fullTextDate: dateReplacer(),
      },
    });

    res.status(200).json("success");
  } catch (err) {
    return catchError({ res, err, message: "unable to locate masses" });
  }
};
