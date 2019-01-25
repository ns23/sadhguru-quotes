/* eslint-disable no-console */
/* eslint-disable no-undef */
require("dotenv").config();
const fetchTweets = require("./lib/fetchTweet");
//Twitter OAuth --- Application only, user context not required.
const search_auth = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET
};

//Product details
const search_config = {
  url: "api.twitter.com/1.1/tweets/search/fullarchive/",
  env: "sadhguru"
};

let query = {
  query: "from:SadhguruJV #SadhguruQuotes",
  fromDate: "200909010000"
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
fetchTweets(request_options, all_data, 1)
  .then(data => {
    console.log("All the data is fetched successfully " + data.tweets.length);
  })
  .catch(err => console.log(err));
