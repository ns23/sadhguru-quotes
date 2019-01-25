require("dotenv").config({ path: __dirname + "/.env" });
const mongoose = require("mongoose");
const Quotes = require("./models/quotes");
const path = require("path");
const fs = require("fs");

mongoose.connect(
  process.env.MONGO_HOST,
  { useNewUrlParser: true }
);
// .then(res => console.log("connection successful"));
const fileName = "26Dec-25jan.json"; //add file name here
const filePath = path.join(__dirname, "db", fileName);
const rawQuotes = fs.readFileSync(filePath);
const quotes = JSON.parse(rawQuotes);
const chalk = require("chalk").default;
const log = console.log;

let itemsProcessed = 0;
quotes.tweets.forEach(quote => {
  Quotes.findOne({ id: quote.id }).then(resp => {
    itemsProcessed++;
    if (resp === null) {
      Quotes.collection
        .insert(quote)
        .then(() => log(chalk.green(quote.id + " added to database")))
        .catch(err => log(chalk.redBright(err)));
    } else {
      log(chalk.yellow(quote.id + " already present in database!!"));
    }
    if (itemsProcessed === quotes.tweets.length) {
      log(chalk.greenBright("All the data is processed!!"));
      mongoose.disconnect();
    }
  });
});
