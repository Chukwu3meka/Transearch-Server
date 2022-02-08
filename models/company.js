const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: { type: String, required: true },
  balance: { type: Number, required: true },
  lastTransactions: [
    {
      credit: { type: Boolean, default: true },
      title: { type: String, required: true },
      description: { type: String, default: null },
      balance: { type: Number, required: true },
      amount: { type: Number, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("company", CompanySchema, "company");
