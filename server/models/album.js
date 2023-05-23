const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      imageUrl: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

const Album = mongoose.model("Album", albumSchema);
module.exports = Album;
