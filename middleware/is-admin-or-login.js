"use strict";
const user = require("../models/user");
const User = require("../models/user");

module.exports = (req, res, next) => {
  const myId = req.user.userId;
  const userId = req.params.userId;
  user
    .findById(myId)
    .then((user) => {
      if (user.isAdmin == false && myId != userId) {
        const error = new Error("Not authorized...");
        error.statusCode = 401;
        throw error;
      }else {
        next()
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};