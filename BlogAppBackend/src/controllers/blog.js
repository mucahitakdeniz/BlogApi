"use strict";

const Blog = require("../models/blog");

module.exports = {
  list: async (req, res) => {
    const data = await req.getModelList(Blog);
  },

  create: async (req, res) => {
    const data = await Blog.create(req.body);
    res.status(201).send({
      error: false,
      result: data,
      send: req.body,
    });
  },
  read: async (req, res) => {
    const data = await Blog.findOne({ _id: req.params.id }).populate(
      "category"
    );
    res.status(200).send({
      error: false,
      result: data,
    });
  },
  update: async (req, res) => {
    const data = await Blog.updateOne({ _id: req.params.id }, req.body);
    res.status(202).send({
      error: false,
      result: data,
      send: req.body,
      newedata: await Blog.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    const data = await Blog.deleteOne({ _id: req.params.id });

    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};
