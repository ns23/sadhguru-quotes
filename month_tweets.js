/* eslint-disable no-console */
/* eslint-disable no-undef */
require("dotenv").config({ path: __dirname + "/.env" });
const chalk = require("chalk").default;
const fetchTweets = require("./lib/fetchTweet");
const { createTemp } = require("./lib/helper");
const log = console.log;

const search_auth = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET
};

//Product details
const search_config = {
  url: "api.twitter.com/1.1/tweets/search/30day/",
  env: "monthTweets"
};

let query = {
  query: "from:SadhguruJV #SadhguruQuotes",
  fromDate: "201812260000",
  toDate: "201901250000"
};

// request options
let request_options = {
  url: "https://" + search_config["url"] + search_config["env"] + ".json",
  oauth: search_auth,
  json: true,
  headers: {
    "content-type": "application/json"
  },
  body: query
};

let all_data = { tweets: [] };
createTemp()
  .then(folder => fetchTweets(request_options, all_data, 1, folder))
  .then(data =>
    log(
      chalk.green("All the data is fetched successfully " + data.tweets.length)
    )
  )
  .catch(err => log(chalk.redBright(err)));
