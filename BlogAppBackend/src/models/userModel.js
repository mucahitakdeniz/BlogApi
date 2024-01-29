"use strict";

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { 
      type: String,
      required: [true, "Email field must be required"],
      unique: true,
      trim: true,
      validate:[(email)=>{
        const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
      } ,'Email is not valid']
    },
    password: {
      type: String,
      require: [true, "Password field must be required"],
      trim: true,
      set:(password)=> require('../helpers/passwordEncrypt')(password)
    },
    fistName: String,
    lastName: String,
  },
  {
    collection: "users",
    timestamps: true,
  }
);
module.exports = mongoose.model("User",  UserSchema);
