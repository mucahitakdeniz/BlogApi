"use strict";

const Category = require("../models/category");

module.exports.Category = {
  list: async (req, res) => {
    const data = await Category.find();
    res.status(200).send({
      error: false,
      result: data,
    });
  },
  create: async (req, res) => {
    const data = await Category.create(req.body);
    res.status(201).send({
      error: false,
      result: data,
      send: req.body,
    });
  },
  read: async (req, res) => {
    const data = await Category.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      result: data,
    });
  },
  update: async (req, res) => {
    const data = await Category.updateOne({ _id: req.params.id }, req.body);
    res.status(202).send({
      error: false,
      result: data,
      send: req.body,
      newedata: await Category.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    const data = await Category.deleteOne({ _id: req.params.id });

    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};
