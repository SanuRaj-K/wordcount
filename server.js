const express = require("express");
const dotenv = require("dotenv");
const seachModel = require("./models/searchModel");
const cors = require("cors");
const { v4: uuidv4, v4 } = require("uuid");
const mongoose = require("mongoose");
const searchModel = require("./models/searchModel");

const app = express();
dotenv.config();
app.use(cors({ origin: "*" }));

const port = 5001;
app.use(express.json());

app.post("/posturl", async (req, res) => {
  const { domainName, wordCount, webLinks, mediaLinks } = req.body;

  try {
    const id = uuidv4();
    const searchItem = new searchModel({
      wordCount: wordCount,
      searchId: id,
      mediaLinks: mediaLinks,
      webLinks: webLinks,
      domainName: domainName,
    });
    res.status(200).json({ searchItem });

    await searchItem.save();
  } catch (err) {
    console.log(err);
  }
});

mongoose
  .connect("mongodb://localhost:27017/wordcount")
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));
app.listen(port, () => console.log("port is running"));
