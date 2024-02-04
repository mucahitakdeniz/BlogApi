"use strict";

const Blog = require("../models/blog");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "List Blogs"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
    const data = await Blog.find().populate(["category_id", "author"]);
    res.status(202).send({
      error: false,
      data,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Create Blog"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "title": "...title...",
                    "content": "...content...",
                    "status": ["p","d"],
                    "author": "user_id",
                }
            }
        */
    const data = await Blog.create(req.body);
    res.status(201).send({
      error: false,
      result: data,
      send: req.body,
    });
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Get Single Blog"
        */
    const data = await Blog.findOne({ _id: req.params.id }).populate([
      "category_id",
      "author",
    ]);
    res.status(200).send({
      error: false,
      result: data,
    });
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Update Blog"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "title": "...title...",
                    "content": "...content...",
                    "status": "p",
                    "author": "user_id",
                }
            }
        */
    const currentBlog = await Blog.findOne({ _id: req.params.id });
    if (req.user._id == currentBlog._id || req.user.is_admin) {
      const data = await Blog.updateOne({ _id: req.params.id }, req.body);
      res.status(202).send({
        error: false,
        result: data,
        send: req.body,
        newdata: await Blog.findOne({ _id: req.params.id }),
      });
    } else {
      res.errorStatusCode = 403;
      throw new Error("You must be the admin or this blog must belong to you");
    }
  },
  delete: async (req, res) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Delete Blog"
        */
    const currentBlog = await Blog.findOne({ _id: req.params.id });
    if (req.user._id == currentBlog._id || req.user.is_admin) {
      const data = await Blog.deleteOne({ _id: req.params.id });
      res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
    } else {
      res.errorStatusCode = 403;
      throw new Error("You must be the admin or this blog must belong to you");
    }
  },
  like: async (req, res) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "like or dislike Blog"
           
        */
    const currentBlog = await Blog.findOne({ _id: req.params.id });
    const like = currentBlog.likes_n.indexOf(req.body._id);
    if (like == -1) {
      currentBlog.likes_n.push("req.body._id");
    } else {
      currentBlog.likes_n.splice(like, 1);
    }
    const data = await Blog.updateOne(
      { _id: req.params.id },
      { likes_n: currentBlog.likes_n }
    );
    res.status(202).send({
      error: false,
      result: data,
      send: req.body,
      newdata: await Blog.findOne({ _id: req.params.id }),
    });
  },
};
