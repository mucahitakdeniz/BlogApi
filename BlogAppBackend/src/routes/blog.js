"use strict";

const blog = require("../controllers/blog");

const router = require("express").Router();

router.route("/").get(blog.list).post(blog.create);
router
  .route("/:id")
  .get(blog.read)
  .post(blog.update)
  .put(blog.update)
  .delete(blog.delete);

//------------------------------

module.exports = router;
