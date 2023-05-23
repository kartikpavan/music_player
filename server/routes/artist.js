const express = require("express");
const router = express.Router();
const {
   getAllArtists,
   saveArtist,
   getSingleArtist,
   deleteArtist,
   UpdateArtist,
} = require("../controller/artist");

router.get("/all", getAllArtists);
router.post("/save", saveArtist);
router.get("/single/:id", getSingleArtist);
router.delete("/delete/:id", deleteArtist);
router.put("/update/:id", UpdateArtist);

module.exports = router;
