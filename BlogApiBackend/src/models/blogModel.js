"use strict";

const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema(
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
    published: {
      type: Boolean,
      default: true,
    },
    blogCategoryId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "BlogCategory",
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    collection: "blogPosts",
    timestamps: true,
  }
);
const blogCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  {
    collection: "blogCategory",
    timestamps: true,
  }
);

module.exports = {
  BlogPost: mongoose.model("BlogPost", blogPostSchema),
  BlogCategory: mongoose.model("BlogCategory", blogCategorySchema),
};
