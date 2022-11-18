"Use strict";

// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();
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

// middleware de confirmation de l'inscription
// module.exports = (req, res, next) => {   
//     const token = req.params.token;
//     User.findOne({ token: token
//      })
//      .then((user) => {
//        if (!user) {
//          const error = new Error("No user found");
//          error.statusCode = 404;
//          throw error;
//        }
//        return user.updateOne({ token: null, isActive: true });
//      })
//      .then((user) => {
//        res.status(200).json({ message: "User confirmed", user: user });
//      })
//      .catch((err) => {
//        if (!err.statusCode) {
//          err.statusCode = 500;
//        }
//        next(err);
//      });
//  };