// firebase admin privileges
const admin = require("../config/firebase.config");

const login = async (req, res) => {
   const bearerToken = req.headers.authorization;
   if (!bearerToken) {
      return res.status(500).json({ msg: "Invalid Authorization Token" }); // internal server error
   }
   const token = req.headers.authorization.split(" ")[1];
   try {
      // decoding token to get the user Account information from firebase
      const decodedValue = await admin.auth().verifyIdToken(token);
      if (!decodedValue) res.status(505).json({ msg: "Unauthorized" });
      else res.status(200).json({ msg: decodedValue });
   } catch (error) {
      return res.status(505).json({ msg: error });
   }
};
module.exports = { login };
