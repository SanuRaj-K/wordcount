const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema({
  searchId: {
    type: String,
  },
  domainName: {
    type: String,
    required: true,
  },
  wordCount: {
    type: Number,
  },
  favourite: {
    type: Boolean,
    default: false,
  },
  webLinks: [{ type: String }],
  mediaLinks: [{ type: String }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const searchModel = mongoose.model("Search", searchSchema);
module.exports = searchModel;
