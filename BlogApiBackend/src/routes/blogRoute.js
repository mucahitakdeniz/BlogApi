"use strict";

const { BlogPost, BlogCategory } = require("../controllers/blogController");

const router = require("express").Router();

router.route("/post").get(BlogPost.list).post(BlogPost.create);
router
  .route("/post/:postId")
  .get(BlogPost.read)
  .post(BlogPost.update)
  .delete(BlogPost.delete);

//------------------------------

router.route("/category").get(BlogCategory.list).post(BlogCategory.create);
router
  .route("/category/:categoryId")
  .get(BlogCategory.read)
  .post(BlogCategory.update)
  .delete(BlogCategory.delete);


  router.get('/category/:categoryId/posts',BlogPost.listCategoryPosts)
module.exports = router;
