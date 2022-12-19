"Use strict";


const User = require("../models/user");

module.exports = (req, res, next) => {
  const myId = req.user.userId;
  User.findById(myId)
    .then((user) => {
      if (user.isActive == false) {
        const error = new Error("Please confirm your account.");
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

