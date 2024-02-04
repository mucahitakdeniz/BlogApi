"use strict";

const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  login: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "user_name":"test",
                    "password":"123Asd.",
                }
            }
        */

    if (req?.body.user_name && req?.body.password) {
      const user = await User.findOne({ user_name: req.body.user_name });
      if (user) {
        const password = passwordEncrypt(req.body.password);
        if (password == user.password) {
          const token = await Token.findOne({ user_id: user._id });
          if (token) {
            res.status(200).send({
              error: false,
              message: "Login successful",
              token: token.token,
            });
          } else {
            const token = passwordEncrypt(user._id + new Date());
            await Token.create({
              user_id: user._id,
              token: token,
            });
            res.status(200).send({
              error: false,
              message: "Login successful",
              token: token,
            });
          }
        } else {
          res.status(401).send({
            error: true,
            message: "The password is wrong",
          });
        }
      } else {
        res.status(401).send({
          error: true,
          message: "Username is wrong",
        });
      }
    } else {
      res.status(401).send({
        error: true,
        message: "Username and password required",
      });
    }
  },
  logout: async (req, res) => {
    const auth = req.headers.authorization || null;
    const token = auth ? auth.split(" ")[1] : null;
    if (token && auth.split(" ")[0] == "Token") {
      await Token.deleteOne({ token: token });
    }
    res.send({ error: false, message: "Logout ok" });
  },
};
