"use strict";
const User = require("../models/user");
const Boycott = require("../models/boycott");

exports.followUser = (req, res, next) => {
  const userId = req.params.userId;
  const myId = req.user.userId;
  User.findById(userId).then((user) => {
    if (!user) {
      const error = new Error("No user found...");
      error.statusCode = 404;
      throw error;
    }
  });
  User.findById(myId)
    .then((user) => {
      const myFollow = user.myFollowedUsers;
      //Vérifie si l'utilisateur est dans le tableau.
      if (myFollow.indexOf(userId) > -1) {
        res.status(201).json({
          message: "User already followed",
          post: user,
        });
      } else if (myId == userId) {
        res.status(201).json({
          message: "Can't follow yourself, follow your dreams!",
          post: user,
        });
        //Sinon on l'ajoute au tableau et on sauvegarde.
      } else {
        myFollow.push(userId);
        user.save();
        res.status(201).json({
          message: "User followed",
          post: user,
        });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.followBoycott = (req, res, next) => {
  const boycottId = req.params.boycottId;
  const myId = req.user.userId;
  Boycott.findById(boycottId).then((user) => {
    if (!user) {
      const error = new Error("No boycott found...");
      error.statusCode = 404;
      throw error;
    }
  });
  User.findById(myId)
    .then((user) => {
      const myFollow = user.myFollowedBoycotts;
      if (myFollow.indexOf(boycottId) > -1) {
        res.status(201).json({
          message: "Boycott already followed",
          post: user,
        });
      } else {
        myFollow.push(boycottId);
        user.save();
        res.status(201).json({
          message: "Boycott followed",
          post: user,
        });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getMyFollowedUsers = (req, res, next) => {
  const myFollow = req.user.userId;
  console.log("MY:",myFollow)
  User.findById(myFollow).then((user) => {
    if (user.myFollowedUsers.length == 0) {
      const error = new Error("You don't follow anyone...");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      user: user.myFollowedUsers
    });
  })
  .catch((err) => {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    next(err)
  });  
};
