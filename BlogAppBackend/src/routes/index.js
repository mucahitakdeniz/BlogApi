"use strict";

const router = require("express").Router();

router.use("/user", require("../routes/user"));
router.use("/blog", require("../routes/blog"));
router.use("/category", require("../routes/category"));

module.exports = router;
