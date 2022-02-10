const { Transaction, Company } = require("../models");
const { catchError, dateReplacer } = require("../utils/serverFunctions");

exports.addTransaction = async (req, res) => {
  try {
    const { title, amount, description, credit, balance, name, id } = req.body;

    await Transaction.create({
      title,
      amount,
      credit,
      description,
      company: id,
      balance: balance + amount,
      keywords: dateReplacer({ credit, balance, amount }),
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

    res.status(200).json("success");
  } catch (err) {
    return catchError({ res, err, message: "unable to locate masses" });
  }
};

exports.atlasSearchTransaction = async (req, res) => {
  try {
    const { searchPhrase, company } = req.body;

    const agg = [
      {
        $search: {
          text: {
            query: searchPhrase,
            path: ["title", "keywords", "description"],
            fuzzy: {},
          },
        },
      },
      {
        $project: {
          title: 1,
          date: 1,
          description: 1,
          credit: 1,
          company: 1,
          amount: 1,
          balance: 1,
          score: {
            $meta: "searchScore",
          },
        },
      },
      {
        $match: {
          company,
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $limit: 10,
      },
    ];

    await Transaction.aggregate(agg, (err, searchResult) => {
      if (err) {
        throw err;
      } else {
        res.status(200).json(searchResult);
      }
    });
  } catch (err) {
    return catchError({ res, err, message: "unable to locate masses" });
  }
};

exports.defaultSearchTransaction = async (req, res) => {
  try {
    const { company } = req.body;

    const result = await Transaction.find({ company }).sort({ _id: -1 });
    res.status(200).json(result);
  } catch (err) {
    return catchError({ res, err, message: "unable to locate masses" });
  }
};
