const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      imageUrl: {
         type: String,
         required: true,
      },
      songUrl: {
         type: String,
         required: true,
      },
      album: {
         type: String,
      },
      artist: {
         type: String,
         required: true,
      },
      language: {
         type: String,
         required: true,
      },
      category: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

const Song = mongoose.model("Song", songSchema);
module.exports = Song;
