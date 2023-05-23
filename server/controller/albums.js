const Album = require("../models/album");

// Save Album in DB
const saveAlbum = async (req, res) => {
   const { name, imageUrl } = req.body;
   // creating new Album instance
   const newAlbum = Album({
      name: name,
      imageUrl: imageUrl,
   });
   // saving the album inside our mongo Db
   try {
      const savedAlbum = await newAlbum.save();
      return res.status(200).json({ success: true, data: savedAlbum });
   } catch (error) {
      res.status(500).json({ success: false, msg: error });
   }
};

// get Single Album
const getSingleAlbum = async (req, res) => {
   // find the album using the ID supplied in tha parameter
   const data = await Album.findOne({ _id: req.params.id });
   if (!data) {
      return res.status(400).send({ sucess: false, msg: "ERROR! Artist not found" }); // internal Server Error
   } else {
      return res.status(200).send({ success: true, data: data });
   }
};

// Get All Albums
const getAllAlbums = async (req, res) => {
   const data = await Album.find();
   if (!data) {
      return res.status(400).send({ sucess: false, msg: "ERROR! Data not found" }); // internal Server Error
   } else {
      return res.status(200).send({ success: true, artist: data });
   }
};

// Delete Artist
const deleteAlbum = async (req, res) => {
   const result = await Album.deleteOne({ _id: req.params.id }, { new: true });
   if (!result) {
      return res.status(400).send({ sucess: false, msg: "ERROR! Data not found" }); // internal Server Error
   } else {
      return res.status(200).send({ success: true, msg: "Data deleted" });
   }
};

// Update Album
const updateAlbum = async (req, res) => {
   const { name, imageUrl } = req.body;
   //update artist info
   try {
      const updatedAlbum = await Album.findOneAndUpdate(
         { _id: req.params.id },
         { name: name, imageUrl: imageUrl },
         { upsert: true, new: true }
      );
      return res.status(200).json({ success: true, data: updatedAlbum });
   } catch (error) {
      return res.status(400).json({ success: false, msg: error });
   }
};

module.exports = { getAllAlbums, saveAlbum, getSingleAlbum, deleteAlbum, updateAlbum };
