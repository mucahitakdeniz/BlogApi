"use strict";

const token = require("../controllers/token");

const router = require("express").Router();

router.route("/").get(token.list);
router.route("/:id").delete(token.delete);

module.exports = router;
