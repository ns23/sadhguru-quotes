// todo : add local development varaible
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const fs = require('fs');

exports.handler = function(event, context, callback) {
  const send = body => {
    callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept"
      },
      body: JSON.stringify(body)
    });
  };

  const getQuote = () => {
    const adapter = new FileAsync(`${__dirname}db/data.json`);
    low(adapter).then(db => {
      return db
        .get("tweets")
        .find({ id: 1056738667262345200 })
        .value();
    })
    .catch(err=>console.log(err));
  };

  const readFile = ()=>{
    let rawdata = fs.readFileSync('/home/ns23/Documents/code/sadhguru-quotes/db/data.json');
    let student = JSON.parse(rawdata);
  }

  // Make sure method is GET
  if (event.httpMethod == "GET") {
    // Run
    // getQuote();
    readFile()
  }
};
