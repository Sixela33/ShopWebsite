const express = require("express");
const { loginFunction } = require("../controllers/auth");

const router = express.Router();

router.route("/google").post(loginFunction);

//  Checks if user in DB.

module.exports = router;
