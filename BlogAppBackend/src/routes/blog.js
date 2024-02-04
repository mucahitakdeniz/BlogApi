"use strict";

const blog = require("../controllers/blog");

const router = require("express").Router();
const { isLogin } = require("../middlewares/permissions");

router.route("/").get(blog.list).post(isLogin, blog.create);
router
  .route("/:id")
  .get(blog.read)
  .post(isLogin, blog.update)
  .put(isLogin, blog.update)
  .delete(isLogin, blog.delete);

//------------------------------

module.exports = router;
