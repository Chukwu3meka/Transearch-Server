const { Transaction, Company } = require("../models");
const { catchError, ordinalSuffix } = require("../utils/serverFunctions");

exports.addTransaction = async (req, res) => {
  try {
    const { title, amount, description, credit, balance, name } = req.body;

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

      return `${fullTextDate.toLowerCase()} ${ordinalSuffix(new Date().getDate())}`;
    };

    await Transaction.create({
      title,
      amount,
      description,
      credit,
      balance: balance + amount,
      date: {
        fullTextDate: dateReplacer(),
      },
    });

    await Company.updateOne(
      { name },
      {
        $inc: { balance: credit ? amount : -amount },
        $push: {
          lastTransactions: {
            $each: [
              {
                credit,
                title,
                description,
                balance: credit ? balance + amount : balance - amount,
                amount,
              },
            ],
            $slice: 2,
            $position: 0,
          },
        },
      }
    );

    const companyData = await Company.findOne({ name });

    const { lastTransactions } = companyData;

    res.status(200).json(lastTransactions);
  } catch (err) {
    return catchError({ res, err, message: "unable to locate masses" });
  }
};
