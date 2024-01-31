"use strict";

const auth = require("../controllers/auth");

const router = require("express").Router();

router.route("/login").post(auth.login);
router.route("/logout").get(auth.logout);
router.route("/logout").post(auth.logout);

module.exports = router;
