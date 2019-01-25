const mongoose = require("mongoose");

/**
 * Quotes Schema
 */

const QuotesSchema = new mongoose.Schema({
  tweet_id: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    required: true
  },
  full_tweet: {
    type: String
  },
  image: {
    type: String
  },
  tweet: {
    type: String
  },
  url: {
    type: String
  }
});

module.exports = mongoose.model("Quotes", QuotesSchema);
