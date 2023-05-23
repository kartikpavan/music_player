const Artist = require("../models/artist");

// Save Artist to DB
const saveArtist = async (req, res) => {
   const { name, imageUrl, twitter } = req.body;
   // Create a new Artist instance coming from body
   const newArtist = Artist({
      name: name,
      imageUrl: imageUrl,
      twitter: twitter,
   });
   // save the artist inside our Mongo DB
   try {
      const savedArtist = await newArtist.save();
      return res.status(200).json({ success: true, data: savedArtist });
   } catch (error) {
      return res.status(400).json({ success: false, msg: error });
   }
};
//Get Single Artist
const getSingleArtist = async (req, res) => {
   // find the artist using the ID supplied in tha parameter
   const data = await Artist.findOne({ _id: req.params.id });
   if (!data) {
      return res.status(400).send({ sucess: false, msg: "ERROR! Artist not found" }); // internal Server Error
   } else {
      return res.status(200).send({ success: true, data: data });
   }
};

// Get All Artists
const getAllArtists = async (req, res) => {
   const data = await Artist.find();
   if (!data) {
      return res.status(400).send({ sucess: false, msg: "ERROR! Data not found" }); // internal Server Error
   } else {
      return res.status(200).send({ success: true, artist: data });
   }
};

// Delete Artist
const deleteArtist = async (req, res) => {
   const result = await Artist.deleteOne({ _id: req.params.id }, { new: true });
   if (!result) {
      return res.status(400).send({ sucess: false, msg: "ERROR! Data not found" }); // internal Server Error
   } else {
      return res.status(200).send({ success: true, msg: "Data deleted" });
   }
};

const UpdateArtist = async (req, res) => {
   const { name, imageUrl, twitter } = req.body;
   //update artist info
   try {
      const updatedArtist = await Artist.findOneAndUpdate(
         { _id: req.params.id },
         { name: name, imageUrl: imageUrl, twitter: twitter },
         { upsert: true, new: true }
      );
      return res.status(200).json({ success: true, data: updatedArtist });
   } catch (error) {
      return res.status(400).json({ success: false, msg: error });
   }
};

module.exports = { getAllArtists, saveArtist, getSingleArtist, deleteArtist, UpdateArtist };
