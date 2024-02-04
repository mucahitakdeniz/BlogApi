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
      default:
        "https://th.bing.com/th/id/OIP.s4Owt_DFJzU5XqxwgM7yoAHaHa?w=192&h=190&c=7&r=0&o=5&pid=1.7",
    },
    author: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    category_id: {
      type: mongoose.Schema.ObjectId,
      required:true,
      ref:"Category"
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
