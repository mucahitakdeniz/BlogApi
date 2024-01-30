"use strict";

const User = require("../models/user");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
    const data = await res.getModelList(User);
    res.status(200).send({
      error: false,
      data,
      details: res.getModelDetailList(User),
    });
  },
  create: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "user_name": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "first_name": "test",
                    "last_name": "test",
                    "image": "...url...",
                    "bio": "I am ...",
                    "is_active": true,
                    "is_admin": false,

                }
            }
        */
    const data = await User.create(req.body);
    res.status(201).send({
      error: false,
      data,
      body: req.body,
      //token
    });
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Get Single User"
        */
    const data = await User.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "user_name": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "first_name": "test",
                    "last_name": "test",
                    "image": "...url...",
                    "bio": "I am ...",
                    "is_active": true,
                    "is_admin": false,

                }
            }
        */
    const data = await User.updateOne({ _id: req.params.id }, req.body);
    res.status(200).send({
      error: false,
      data,
    });
  },
  delete: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete User"
        */
    const data = await User.delete({ _id: req.params.id });

    res.status(data.deletetCount ? 204 : 404).send({
      error: !data.deletetCount,
      data,
    });
  },
};
