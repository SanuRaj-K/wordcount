const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const searchRoute = require("./router/seachRoute");
const app = express();
dotenv.config();
// app.use(cors({ origin: "*" }));
app.use(cors({ origin: "https://word-count-frontend.vercel.app/" }));
const port = 5001;
app.use(express.json());
app.use("/search", searchRoute);
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));
app.listen(port, () => console.log("port is running"));
