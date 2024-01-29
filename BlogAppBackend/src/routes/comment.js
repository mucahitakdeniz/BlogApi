"use strict";

const commets = require("../controllers/commets");

const router = require("express").Router();

router.route("/").get(commets.list).post(commets.create);
router
  .route("/:id")
  .post(commets.update)
  .put(commets.update)
  .delete(commets.delete);

//------------------------------

module.exports = router;
