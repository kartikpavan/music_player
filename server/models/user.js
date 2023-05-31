const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
      },
      userImageUrl: {
         type: String,
         required: true,
      },
      user_id: {
         type: String,
         required: true,
      },
      email_verified: {
         type: Boolean,
         required: true,
      },
      role: {
         type: String,
         required: true,
      },
      auth_time: {
         type: String,
         required: true,
      },
      favoriteSongs: [{}],
   },
   { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
