"use strict";

const Post = require("../models/boycott");

exports.getBoycotts = (req, res, next) => {
  Post.find()
    .then(posts => {
      if (!posts) {
        const error = new Error("Aucun post trouvé");
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({
        posts: posts
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

exports.createBoycott = (req, res, next) => {
  const target = req.body.target;
  const description = req.body.description;
  const summarize = req.body.summarize;
  const post = new Post({
    target: target,
    description: description,
    summarize: summarize,
    // userId: req.user.userId
  });
  post.save()
    .then(result => {
      res.status(201).json({
        message: "Post créé avec succès !",
        post: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}