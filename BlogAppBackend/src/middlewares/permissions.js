"use strict";

module.exports = {
  isLogin: (req, res, next) => {
    if (req.user && req.user.is_active) {
      next();
    } else {
      res.statusCode = 403;
      throw new Error("No Permission : You must Login");
    }
  },
  isAdmin: (req, res, next) => {
    if (req.user && req.user.is_admin) {
      next();
    } else {
      res.statusCode = 403;
      throw new Error("No Permission : You must Admin");
    }
  },
  isAdminOrHimself: (req, res, next) => {
    if (req.user && req.user.is_active) {
      if (req.user.is_admin || req.user._id == req.params.id) {
        next();
      } else {
        res.statusCode = 403;
        throw new Error(
          "No Permission : You must be the admin or you must have created this blog"
        );
      }
    } else {
      res.statusCode = 403;
      throw new Error("No Permission : You must Login");
    }
  },
};
