/* eslint-disable no-console */
const request = require("request");

// POST request

function fetchTweets(request_options) {
  return new Promise((resolve, reject) => {
    request.post(request_options, function (error, response, body) {
      if (error) {
        console.log("Error making search request.");
        reject(error);
      }
      resolve(body);
    });
  });

}
 module.exports = fetchTweets;