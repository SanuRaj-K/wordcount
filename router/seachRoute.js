const express = require("express");
const router = express.Router();
const searchController = require("../controller/searchController");

router.get("/list", searchController.getList);
router.post('/add',searchController.seachURL)

router.delete("/delete/:id", searchController.deleteSearchItem);

router.put("/addfav/:id", searchController.addFav);

router.put("/removefav/:id", searchController.removeFav);

module.exports = router;
