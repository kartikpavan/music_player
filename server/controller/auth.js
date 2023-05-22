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
      if (!decodedValue) res.status(505).json({ msg: "Unauthorized Access" });
      else {
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
               res.status(500).send({ sucess: false, msg: error }); // internal Server Error
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
               res.status(500).send({ sucess: false, msg: error }); // internal Server Error
            }
         }
      }
   } catch (error) {
      return res.status(505).json({ msg: error }); // server error
   }
};
module.exports = { login };
