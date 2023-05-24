const Song = require("../models/song");

//save a song to Db
const saveSong = async (req, res) => {
   const { name, imageUrl, songUrl, album, artist, language, category } = req.body;
   // create a new Song Instance in or DB
   const newSong = Song({
      name,
      imageUrl,
      songUrl,
      album,
      artist,
      language,
      category,
   });
   try {
      const savedSong = await newSong.save();
      res.status(200).send({ data: savedSong }); // sending saved song info back to frontend
   } catch (error) {
      res.status(500).send({ sucess: false, msg: error }); // internal Server Error
   }
};

// get single song
const getSingleSong = async (req, res) => {
   // find the Song using the ID supplied in tha parameter
   const data = await Song.findOne({ _id: req.params.id });
   if (!data) {
      return res.status(400).send({ sucess: false, msg: "ERROR! Song not found" }); // internal Server Error
   } else {
      return res.status(200).send({ success: true, data: data });
   }
};

// get all songs
const getAllSongs = async (req, res) => {
   const data = await Song.find();
   if (!data) {
      return res.status(400).send({ sucess: false, msg: "ERROR! Data not found" }); // internal Server Error
   } else {
      return res.status(200).send({ success: true, data: data });
   }
};

// delete single song
const deleteSong = async (req, res) => {
   const result = await Song.deleteOne({ _id: req.params.id }, { new: true });
   if (!result) {
      return res.status(400).send({ sucess: false, msg: "ERROR! Data not found" }); // internal Server Error
   } else {
      return res.status(200).send({ success: true, msg: "Data deleted" });
   }
};

// update Single song
const updateSong = async (req, res) => {
   const { name, imageUrl, songUrl, album, artist, language, category } = req.body;
   //updating Song info
   try {
      const updatedSong = await Song.findOneAndUpdate(
         { _id: req.params.id },
         { name, imageUrl, songUrl, album, artist, language, category },
         { upsert: true, new: true }
      );
      return res.status(200).json({ success: true, data: updatedSong });
   } catch (error) {
      return res.status(400).json({ success: false, msg: error });
   }
};

module.exports = { getAllSongs, saveSong, getSingleSong, deleteSong, updateSong };
