"use strict";
const User = require("../models/user");
const Boycott = require("../models/boycott");
const boycott = require("../models/boycott");


exports.followUser = (req, res, next) => {
  const userId = req.params.userId;
  const myId = req.user.userId;

  User.findById(userId).then((user) => {
    if (!user) {
      const error = new Error("No user found...");
      error.statusCode = 404;
      throw error;
      //Si le l'utilisateur est trouvé on sauvegarde l'id du follower dans le user follow.
    } else {
      user.followers.push(myId);
      user.save();
    }
  });

  User.findById(myId)
    .then((user) => {
      const myFollow = user.following;
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

  Boycott.findById(boycottId).then((boycott) => {
    if (!boycott) {
      const error = new Error("No boycott found...");
      error.statusCode = 404;
      throw error;
    } else {
      boycott.followers.push(myId);
      boycott.save();
    }
  });

  User.findById(myId)
    .then((user) => {
      const myFollow = user.boycotting;
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

exports.getFollowers = (req, res, next) => {
  const myId = req.user.userId;

  User.findById(myId)
  .then((user) => {
    if (user.followers.length == 0) {
      const error = new Error("Loser! You don't have any followers");
      error.statusCode = 404;
      throw error;
    } else {
      User.find({following: myId})
      .then((follow) => {
        res.status(200).json({
          followers: follow,
        })
      })
    }
  })
  .catch((err) => {
    if(!err.statusCode){
    err.statusCode = 500;
    }
    next(err);
  });
};

exports.getBoycotting = (req, res, next) => {
  const myId = req.user.userId;
  User.findById(myId).then((user) => {
    if (user.boycotting.length == 0) {
      const error = new Error("You don't follow any boycott...");
      error.statusCode = 404;
      throw error;
    } else {
      Boycott.find({ followers: myId})
      .then((boycott) => {
        res.status(200).json({
          boycotts: boycott,
        })
      })
    }
  })
  .catch((err) => {
    if (!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
  })
};

exports.getFollowing = (req, res, next) => {
  const myId = req.user.userId;
  
  User.findById(myId)
    .then((user) => {
      const follow = user.following.length;
      if (follow == 0) {
        const error = new Error("You don't follow anyone...");
        error.statusCode = 404;
        throw error;
      } else {
        User.find({ followers: myId })
        .then((follow) => {
          res.status(200).json({
            myFollow: follow,
          })
        })
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.unfollowUser = (req, res, next) => {
  const myId = req.user.userId;
  const userId = req.params.userId;
  User.findById(userId).then((user) => {
    if (user.followers.indexOf(myId) > -1) {
      const userIndex = user.followers.indexOf(myId);
      user.followers.splice(userIndex, 1);
      user.save();
      res.status(200).json({
        message: "User unfollowed",
      });
    } else {
      const error = new Error("Error...");
      error.statusCode = 404;
      throw error;
    }
  });
  User.findById(myId)
    .then((user) => {
      const userIndex = user.following.indexOf(userId);
      user.following.splice(userIndex, 1);
      user.save();
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.unfollowBoycott = (req, res, next) => {
  const myId = req.user.userId;
  const boycottId = req.params.boycottId;
  Boycott.findById(boycottId)
    .then((boycott) => {
      if (boycott.followers.indexOf(myId) > -1) {
        const userIndex = boycott.followers.indexOf(myId);
        boycott.followers.splice(userIndex, 1);
        boycott.save();
        res.status(200).json({
          message: "Boycott unfollowed",
        });
      } else {
        const error = new Error("Error...");
        error.statusCode = 404;
        throw error;
      }
    });
  User.findById(myId)
    .then((user) => {
      const userIndex = user.boycotting.indexOf(boycottId);
      user.boycotting.splice(userIndex, 1);
      user.save();
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
