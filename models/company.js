const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  title: { type: String, required: true },
  balance: { type: Number, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: false },
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

CompanySchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

CompanySchema.methods.hashPassword = async function (password, next) {
  try {
    return await bcrypt.hash(password, 10);
  } catch (err) {
    next(err);
  }
};
CompanySchema.methods.comparePassword = async function (attempt, next) {
  try {
    return await bcrypt.compare(attempt, this.password);
  } catch (err) {
    next(err);
  }
};

module.exports = mongoose.model("company", CompanySchema, "company");
