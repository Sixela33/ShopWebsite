const express = require("express");
const { addMoney } = require("../controllers/users");

const router = express.Router();

router.route("/:id").patch(addMoney);

module.exports = router;
