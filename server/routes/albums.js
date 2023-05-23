const express = require("express");
const router = express.Router();
const {
   getAllAlbums,
   saveAlbum,
   getSingleAlbum,
   deleteAlbum,
   updateAlbum,
} = require("../controller/albums");

router.get("/all", getAllAlbums);
router.post("/save", saveAlbum);
router.get("/single/:id", getSingleAlbum);
router.delete("/delete/:id", deleteAlbum);
router.put("/update/:id", updateAlbum);

module.exports = router;
