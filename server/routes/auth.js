const express = require("express");
const router = express.Router();
const { login, getAllUsers } = require("../controller/auth");

router.get("/login", login);
router.get("/allUsers", getAllUsers);

module.exports = router;
