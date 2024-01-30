"use strict";

const comment = require("../controllers/comment");

const router = require("express").Router();

router.route("/").get(comment.list).post(comment.create);
router
  .route("/:id")
  .post(comment.update)
  .put(comment.update)
  .delete(comment.delete);

//------------------------------

module.exports = router;
