/* eslint-disable no-console */
/* eslint-disable no-undef */
const fs = require("fs");
require("dotenv").config();
var sleep = require("sleep");

//Twitter OAuth --- Application only, user context not required.
const search_auth = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  // token: process.env.ACCESS_TOKEN,
  // token_secret: process.env.ACCESS_TOKEN_SECRET
};

//Product details
const search_config = {
  url: "api.twitter.com/1.1/tweets/search/fullarchive/",
  env: "sadhguru"
};

// build request <-- input
let flag = false;

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

let all_data = {'tweets':[]};
let dataset = getAllTweets(request_options, all_data, 1);

function getAllTweets(request_options, all_data, fileIndex) {
  return fetchTweet(request_options)
    .then(resp => {
      console.log("Tweets fetched !!!");
      let data = resp.results;
			console.log("Processing Data");

			// loop trough all the tweets
      data.forEach(tweet => {
        temp = {};
        temp.id = tweet.id;
        temp.created_at = tweet.created_at;
        if (tweet.extended_tweet !== undefined) {
          temp.full_tweet = tweet.extended_tweet.full_text;

					// check if a image is present with a tweet
					if (
            tweet.extended_tweet.extended_entities !== undefined &&
            tweet.extended_tweet.extended_entities.media.length > 0
          ) {
            temp.image =
              tweet.extended_tweet.extended_entities.media[0].media_url_https;
          }
				}

        temp.tweet = tweet.text;
        if (tweet.entities.urls.length > 0) {
          if (tweet.entities.urls[0].expanded_url !== undefined) {
            temp.url = tweet.entities.urls[0].expanded_url;
          }
        }

        all_data.push(temp);
      });
			console.log("Data Processed\n Write data to intermediate file");
			// write to intermediate files
      fs.writeFileSync(
        "./db/data" + fileIndex + ".json",
        JSON.stringify(all_data, null, 2),
        "utf-8"
      );
      fileIndex = fileIndex + 1;
      if (resp.hasOwnProperty("next") || resp.next !== "") {
        request_options.body.next = resp.next;
        console.log("Wait till next call");
        sleep.sleep(5);
        console.log("Fetching next set of records");
        return getAllTweets(request_options, all_data, fileIndex);
      } else {
        console.log("All data feched");
        fs.writeFileSync(
          "./db/final_data.json",
          JSON.stringify(all_data, null, 2),
          "utf-8"
        );
        return all_data;
      }
    })
    .catch(err => console.log(err));
}
