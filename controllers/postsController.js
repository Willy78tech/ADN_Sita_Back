"use strict";

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
  Post.find()
    .then(posts => {
      if (!posts) {
        const error = new Error('Aucun post trouvé');
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

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    userId: req.user.userId
  });
  post.save()
    .then(result => {
      res.status(201).json({
        message: 'Post créé avec succès !',
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