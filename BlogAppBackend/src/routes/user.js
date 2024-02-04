"use strict";

const router = require("express").Router();
const user = require("../controllers/user");

const {
  isAdmin,
  isAdminOrHimself,
} = require("../middlewares/permissions");

router.route("/").get(isAdmin, user.list).post(user.create);

router
  .route("/:id")
  .get(isAdminOrHimself, user.read)
  .post(isAdminOrHimself, user.update)
  .put(isAdminOrHimself, user.update)
  .delete(isAdminOrHimself, user.delete);

module.exports = router;
