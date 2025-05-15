const express = require("express");
const getContact = require("../controller/contact");
const router = express.Router();
router.route("/").get(getContact);
module.exports = router;
