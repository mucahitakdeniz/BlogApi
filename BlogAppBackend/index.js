"use strict";

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

//SessionCookies

const session = require("cookie-session");
app.use(
  session({
    secret: process.env.SECRET_KEY || "secret_keys_for_cookies",
  })
);

app.use(express.json());

require("./src/dbconnection");

app.use(require('./src/middlewares/findSearchSortPage')) 

//deneme
app.all("/", (req, res) => {
  res.send("Running!!!");
});
app.use("/user", require("./src/routes/userRoute"));

app.use("/blogs", require("./src/routes/blogRoute"));

//Synchronization
//require("./src/sync")()

app.use(require("./src/errorHandler"));

app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
