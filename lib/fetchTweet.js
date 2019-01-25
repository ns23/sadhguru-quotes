/* eslint-disable no-console */
const request = require("request");
const sleep = require("sleep");
const fs = require("fs");
const chalk = require("chalk").default;
const path = require("path");

const log = console.log;

// POST request

function post(request_options) {
  return new Promise((resolve, reject) => {
    request.post(request_options, function(error, response, body) {
      if (error) {
        log(chalk.red("Error making search request."));
        reject(error);
      }
      resolve(body);
    });
  });
}
// let all_data_temp = { tweets: [] };
function fetchTweets(request_options, all_data, fileIndex, folder) {
  let temp;
  return new Promise((resolve, reject) => {
    post(request_options)
      .then(resp => {
        if (resp.hasOwnProperty("error")) reject(resp.error);
        log(chalk.green("Tweets fetched !!!"));
        let data = resp.results;
        log(chalk.blue("Processing Data"));

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

          all_data.tweets.push(temp);
        });
        log(chalk.cyan("Data Processed\n Writing data to intermediate file"));
        // write to intermediate files
        fs.writeFileSync(
          path.join(folder, fileIndex + ".json"),
          JSON.stringify(all_data, null, 2),
          "utf-8"
        );
        fileIndex = fileIndex + 1;
        if (resp.hasOwnProperty("next") && resp.next !== "") {
          request_options.body.next = resp.next;
          sleep.sleep(5);
          log(chalk.grey("Fetching next set of records"));
          return fetchTweets(request_options, all_data, fileIndex, folder);
        } else {
          log(chalk.greenBright("All data feched"));
          fs.writeFileSync(
            path.join(folder, "final_data.json"),
            JSON.stringify(all_data, null, 2),
            "utf-8"
          );
          resolve(all_data);
        }
      })
      .catch(err => reject(err));
  });
}
module.exports = fetchTweets;
