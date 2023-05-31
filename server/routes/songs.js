const express = require("express");
const router = express.Router();

const {
   getAllSongs,
   saveSong,
   getSingleSong,
   deleteSong,
   updateSong,
   getFavoriteSongs,
} = require("../controller/songs");

router.get("/all", getAllSongs);
router.post("/save", saveSong);

router.get("/single/:id", getSingleSong);
router.delete("/delete/:id", deleteSong);
router.put("/update/:id", updateSong);

module.exports = router;
