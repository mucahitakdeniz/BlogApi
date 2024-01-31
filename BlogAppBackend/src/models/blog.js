"use strict";

const mongoose = require("mongoose");
/* ------------------------------------------------------- *
{
    "title": " Title",
    "content": "...content... ",
    "status": "p",
    "author": "test",
    "likes_n": ["test","admin",....],
    "likes": 28
    "post_views": 45,
}
 ------------------------------------------------------- */
// Blog Model:

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["p", "d"],
      default: "p",
    },
    image: {
      type: String,
      trim: true,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    likes_n: {
      type: Array,
      default: [],
    },
    likes: {
      type: Number,
      default: function () {
        return this.likes_n.length;
      },
    },
    post_views: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "blogs",
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", BlogSchema);
