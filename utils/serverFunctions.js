// catch err in return
module.exports.catchError = ({ res, err, status = 400, message = "Internal Server Error" }) => {
  if (process.env.NODE_ENV !== "production") console.log(`${res.req.originalUrl}: ${err}`);
  res.status(status).json(message);
};

// get random value between two numbers
module.exports.range = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// make values in an array unique
module.exports.uniqueArray = (arr) => arr.filter((value, index, self) => self.indexOf(value) === index);

//to shuffle array
module.exports.shuffleArray = (arr = []) => {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 3));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// ordinal suffix
module.exports.ordinalSuffix = (n) => n + (n + 0 ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : "");

module.exports.dateReplacer = (credit) => {
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

  return `${fullTextDate.toLowerCase()} ${ordinalSuffix(new Date().getDate())} ${credit ? "credit" : "debit"}`;
};
