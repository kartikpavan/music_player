const express = require("express");
const router = express.Router();
const { login, getAllUsers, updateUserRole, deleteUser } = require("../controller/auth");

router.get("/login", login);
router.get("/allUsers", getAllUsers);
router.put("/updateRole/:userId", updateUserRole);
router.delete("/delete/:userId", deleteUser);

module.exports = router;
