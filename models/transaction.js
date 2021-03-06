const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  credit: { type: Boolean, default: true },
  company: { type: String, required: true },
  balance: { type: Number, required: true },
  description: { type: String, default: null },
  date: { type: Date, default: Date.now },
  keywords: { type: String },
});

module.exports = mongoose.model("transaction", TransactionSchema, "transaction");
