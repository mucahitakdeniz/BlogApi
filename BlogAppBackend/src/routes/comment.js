"use strict";

const comment = require("../controllers/comment");

const router = require("express").Router();
const {
  isLogin,
  isAdminOrHimself,
} = require("../middlewares/permissions");

router.route("/").get(comment.list).post(isLogin, comment.create);
router
  .route("/:id")
  .post(isAdminOrHimself, comment.update)
  .put(isAdminOrHimself, comment.update)
  .delete(isAdminOrHimself, comment.delete);

//------------------------------

module.exports = router;
