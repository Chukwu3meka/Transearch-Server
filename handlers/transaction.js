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
      date: {
        fullTextDate: dateReplacer(credit),
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

    res.status(200).json("success");
  } catch (err) {
    return catchError({ res, err, message: "unable to locate masses" });
  }
};

exports.searchTransaction = async (req, res) => {
  try {
    const { searchPhrase } = req.body;

    // searchPhrase

    const agg = [
      {
        $search: {
          text: {
            query: searchPhrase,
            path: ["title", "date.fullTextDate", "description", "amount", "balance"],
            fuzzy: {},
          },
        },
      },
      {
        $project: {
          title: 1,
          "date.timeStamp": 2,
          description: 1,
          credit: 1,
          amount: 1,
          balance: 1,
          score: {
            $meta: "searchScore",
          },
        },
      },
      {
        $limit: 10,
      },
    ];

    // MongoClient.connect(
    //   '',
    //   { useNewUrlParser: true, useUnifiedTopology: true },
    //   function(connectErr, client) {
    //     assert.equal(null, connectErr);
    //     const coll = client.db('').collection('');
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
