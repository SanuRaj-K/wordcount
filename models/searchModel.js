const mongoose = require("mongoose");

const serachSchema = new mongoose.Schema({
  searchId: {
    type: String,
    required: true,
  },
  domainName: {
    type: String,
    required: true,
  },
  wordCount: {
    type: String,
    required: true,
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

const searchModel = mongoose.model("Search", serachSchema);
module.exports = searchModel;
