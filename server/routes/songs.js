const express = require("express");
const router = express.Router();

const { getAllSongs } = require("../controller/songs");

router.get("/all", getAllSongs);

module.exports = router;
