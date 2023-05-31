const User = require("../models/user");
// firebase admin privileges
const admin = require("../config/firebase.config");

const login = async (req, res) => {
   // checking if bearer token is present
   const bearerToken = req.headers.authorization;
   if (!bearerToken) {
      return res.status(500).json({ msg: "Invalid Authorization Token" }); // internal server error
   }
   // extracting the token
   const token = req.headers.authorization.split(" ")[1];
   try {
      // decoding token to get the user Account information from firebase
      const decodedValue = await admin.auth().verifyIdToken(token);
      if (!decodedValue) {
         res.status(505).json({ msg: "Unauthorized Access" });
      } else {
         // check user exist in database
         const existingUser = await User.findOne({ user_id: decodedValue.user_id });
         if (!existingUser) {
            // creating new user Instance
            const newUser = new User({
               name: decodedValue.name,
               email: decodedValue.email,
               userImageUrl: decodedValue.picture,
               user_id: decodedValue.user_id,
               email_verified: decodedValue.email_verified,
               role: "member",
               auth_time: decodedValue.auth_time,
            });
            // saving the new user in DB
            try {
               const savedUser = await newUser.save();
               res.status(200).send({ user: savedUser }); // sending saved user info back to frontend
            } catch (error) {
               res.status(500).send({ success: false, msg: error }); // internal Server Error
            }
         } else {
            // Updating Auth_time
            try {
               const result = await User.findOneAndUpdate(
                  { user_id: decodedValue.user_id },
                  { auth_time: decodedValue.auth_time },
                  { upsert: true, new: true } // if doc does not exist then create new and return that doc
               );
               res.status(200).send({ user: result });
            } catch (error) {
               res.status(500).send({ success: false, msg: error }); // internal Server Error
            }
         }
      }
   } catch (error) {
      return res.status(505).json({ msg: error }); // server error
   }
};

// get all users

const getAllUsers = async (req, res) => {
   const currentUsers = await User.find();
   if (currentUsers) {
      return res.status(200).json({ success: true, data: currentUsers });
   } else {
      return res.status(500).json({ success: false, msg: "Users not found" });
   }
};

//Get Single User
const getSingleUser = async (req, res) => {
   // find the user using the ID supplied in tha parameter
   const data = await User.findOne({ _id: req.params.userId });
   if (!data) {
      return res.status(400).send({ success: false, msg: "ERROR! Artist not found" }); // internal Server Error
   } else {
      return res.status(200).send({ success: true, data: data });
   }
};

// Updating User Role
const updateUserRole = async (req, res) => {
   try {
      const updatedUser = await User.findOneAndUpdate(
         { _id: req.params.userId },
         { role: req.body.data.role }
      );
      return res.status(200).json({ success: true, data: updatedUser });
   } catch (error) {
      return res.status(400).json({ success: false, msg: error });
   }
};

// delete user
const deleteUser = async (req, res) => {
   const result = await User.deleteOne({ _id: req.params.userId }, { new: true });
   if (!result) {
      return res.status(400).send({ success: false, msg: "ERROR! Data not found" }); // internal Server Error
   } else {
      return res.status(200).send({ success: true, msg: "Data deleted" });
   }
};

// updating / adding Favorite song
const addFavoriteSong = async (req, res) => {
   try {
      const updatedUser = await User.findOneAndUpdate(
         { _id: req.params.userId, favoriteSongs: { $ne: req.body.data.songId } }, // detecting duplicates before inserting
         { $push: { favoriteSongs: req.body.data.songId } }, // adding an element to the array
         { upsert: true, new: true }
      );
      return res.status(200).json({ success: true, data: updatedUser });
   } catch (error) {
      return res.status(400).json({ success: false, msg: error });
   }
};

// unfavorite song
const deleteFavoriteSong = async (req, res) => {
   try {
      const updatedUser = await User.findOneAndUpdate(
         { _id: req.params.userId },
         { $pull: { favoriteSongs: req.body.data.songId } }, // removing the element from the array
         { new: true }
      );
      return res.status(200).json({ success: true, data: updatedUser });
   } catch (error) {
      return res.status(400).json({ success: false, msg: error });
   }
};

module.exports = {
   login,
   getAllUsers,
   updateUserRole,
   deleteUser,
   getSingleUser,
   addFavoriteSong,
   deleteFavoriteSong,
};
