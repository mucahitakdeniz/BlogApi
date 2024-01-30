"use strict";

const router = require("express").Router();

router.use("/users", require("../routes/user"));
router.use("/blogs", require("../routes/blog"));
router.use("/categories", require("../routes/category"));
router.use("/comments", require("../routes/comment"));


router.use("/documents", require("../routes/document"));

module.exports = router;
