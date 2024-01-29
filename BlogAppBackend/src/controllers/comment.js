"use strict";

const Comment = require("../models/Comment");

module.exports = {
  create: async (req, res) => {
    const data = await Comment.create(req.body);
    res.status(201).send({
      error: false,
      result: data,
      send: req.body,
    });
  },
  update: async (req, res) => {
    const data = await Comment.updateOne({ _id: req.params.id }, req.body);
    res.status(202).send({
      error: false,
      result: data,
      send: req.body,
      newedata: await Comment.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    const data = await Comment.deleteOne({ _id: req.params.id });

    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};
