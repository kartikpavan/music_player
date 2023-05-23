const express = require("express");
const router = express.Router();
const { getAllAlbums } = require("../controller/albums");

router.get("/all", getAllAlbums);

module.exports = router;
