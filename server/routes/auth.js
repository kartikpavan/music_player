const express = require("express");
const router = express.Router();
const {
   login,
   getAllUsers,
   updateUserRole,
   deleteUser,
   getSingleUser,
   addFavoriteSong,
   deleteFavoriteSong,
} = require("../controller/auth");

router.get("/login", login);
router.get("/allUsers", getAllUsers);
router.get("/single/:userId", getSingleUser);
router.put("/updateRole/:userId", updateUserRole);
router.delete("/delete/:userId", deleteUser);

// favorites
router.put("/favorites/:userId", addFavoriteSong);
router.put("/unfavorite/:userId", deleteFavoriteSong);

module.exports = router;
