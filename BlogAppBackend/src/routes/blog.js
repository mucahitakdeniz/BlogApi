"use strict";

const blog = require("../controllers/blog");

const router = require("express").Router();
const {
  isLogin,
  isAdminOrHimself,
} = require("../middlewares/permissions");

router.route("/").get(blog.list).post(isLogin, blog.create);
router
  .route("/:id")
  .get(blog.read)
  .post(isAdminOrHimself, blog.update)
  .put(isAdminOrHimself, blog.update)
  .delete(isAdminOrHimself, blog.delete);

//------------------------------

module.exports = router;
