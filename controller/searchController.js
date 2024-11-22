const express = require("express");
const app = express();
const searchModel = require("../models/searchModel");
const { v4: uuidv4, v4 } = require("uuid");
const seachURL = async (req, res) => {
  const { domainName, webLinks, mediaLinks } = req.body;

  try {
    const id = uuidv4();
    const count = Math.floor(Math.random() * (999 - 99 + 1)) + 99;
    const searchItem = new searchModel({
      wordCount: count,
      searchId: id,
      mediaLinks: mediaLinks,
      webLinks: webLinks,
      domainName: domainName, 
    });
    const isDomainAlreadySearched = await searchModel.findOne({
      domainName: domainName,
    });
    if (isDomainAlreadySearched) {
      res.status(409).send("This domain is already searched");
    } else {                                   
      const savedSearch = await searchItem.save();
      res.status(200).send(savedSearch);
    }
  } catch (err) {
    console.log(err);
  }
};

const getList = async (req, res) => {
  const list = await searchModel.find();
  if (!list) {
    res.status(404).send({
      message: "List Not getting",
    });
  }
  res.status(200).send({ data: list });
};

const deleteSearchItem = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await searchModel.deleteOne({ searchId: id });
    if (item.deletedCount > 0) {
      res.status(200).send({ message: "item successfully deleted" });
    } else {
      res.status(404).send({ message: "item not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

const addFav = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await searchModel.findOne({ searchId: id });
    if (item) {
      const updatedItem = await searchModel.updateOne(
        { searchId: id },
        { $set: { favourite: true } }
      );
      if (updatedItem.modifiedCount > 0) {
        res.status(200).send({ message: "Item Added to favourite" });
      } else {
        res.status(404).send({ message: "Item not added to favourite" });
      }
    } else {
      res.status(404).send({ message: "item not found" });
    }
  } catch (err) {
    console.log(err);
    res.send({ message: "something went wrong...!" });
  }
};
const removeFav = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await searchModel.findOne({ searchId: id });
    if (item) {
      const updatedItem = await searchModel.updateOne(
        { searchId: id },
        { $set: { favourite: false } }
      );
      if (updatedItem.modifiedCount > 0) {
        res.status(200).send({ message: "Item removed from favourite" });
      } else {
        res.status(404).send({ message: "Item not removed to favourite" });
      }
    } else {
      res.status(404).send({ message: "item not found" });
    }
  } catch (err) {
    console.log(err);
    res.send({ message: "something went wrong...!" });
  }
};
module.exports = {
  addFav,
  deleteSearchItem,
  getList,
  removeFav,
  seachURL,
};
