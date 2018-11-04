/* eslint-disable no-console */
/* eslint-disable no-undef */
require("dotenv").config();
const { fetchTweet, init_db, add_quote } = require('./lib');

//test code


// try to addd some data
for (let index = 5; index < 10; index++) {
	add_quote({
		text: `quote ${index}`,
		date: new Date()
	}).then(() => console.log('data saved'))
}




//Twitter OAuth --- Application only, user context not required. 
const search_auth = {
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET //,
	//token: process.env.ACCESS_TOKEN,
	//token_secret: process.env.ACCESS_TOKEN_SECRET
};

//Product details
const search_config = {
	url: "api.twitter.com/1.1/tweets/search/fullarchive/",
	env: process.env.ENV
};

// build request <-- input
let flag = false;

let query = {
	"query": "from:SadhguruJV #SadhguruQuotes",
	"fromDate": "200909010000",
};

// request options
let request_options = {
	//POST form with "body: query" below
	url: "https://" + search_config["url"] + search_config["env"] + ".json",
	oauth: search_auth,
	json: true,
	headers: {
		"content-type": "application/json"
	},
	body: query
};

// do {
// 	fetchTweet(request_options)
// 		.then((body) => {
// 			if (body.hasOwnProperty('next') || body.next !== "") {
// 				query.next = body.next;
// 			} else {
// 				flag = false;
// 			}
// 			save2json(body);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		})
// } while (flag);


