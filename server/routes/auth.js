const express = require("express");
const router = express.Router();
const { login, getAllUsers, updateUserRole } = require("../controller/auth");

router.get("/login", login);
router.get("/allUsers", getAllUsers);
router.put("/updateRole/:userId", updateUserRole);

module.exports = router;
