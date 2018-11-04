const fetchTweet = require('./fetchTweet');
const { init_db, add_quote } = require('./save');

module.exports = {
  fetchTweet,
  init_db,
  add_quote
}