"use strict";

const category = require("../controllers/category");

const router = require("express").Router();

router.route("/category").get(category.list).post(category.create);
router
  .route("/category/id")
  .get(category.read)
  .post(category.update)
  .put(category.update)
  .delete(category.delete);

module.exports = router;
