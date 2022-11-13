"use strict";


const Boycott = require("../models/boycott");

// fonction qui permet d'ajouter un commentaire sur un boycott
exports.addComment = (req, res, next) => {
    const boycottId = req.params.boycottId;
    const userId = req.user.userId;
    const comments = req.body.comments;
    Boycott.findById(boycottId)
      .then((boycott) => {
        if (!boycott) {
          const error = new Error("No boycott found...");
          error.statusCode = 404;
          throw error;
        } else {
          boycott.comments.push(comments);
          boycott.save();
          res.status(201).json({
            message: "Comment added",
            post: boycott,
          });
        }
      }
      )
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
      );
};

// supprimer un commentaire sur un boycott
exports.deleteComment = (req, res, next) => {
    const boycottId = req.params.boycottId;
    const commentId = req.params.commentId;
    Boycott.findById(boycottId)
      .then((boycott) => {
        if (!boycott) {
          const error = new Error("No boycott found");
          error.statusCode = 404;
          throw error;
        }
        const comment = boycott.comments.find((c) => c._id.toString() === commentId);
        if (!comment) {
          const error = new Error("No comment found");
          error.statusCode = 404;
          throw error;
        }
        comment.remove();
        return boycott.save();
      }
      )
      .then((boycott) => {
        res.status(200).json({ message: "Comment deleted", boycott: boycott });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };



// modifier un commentaire sur un boycott
exports.modComment = (req, res, next) => {
    const boycottId = req.params.boycottId;
    const commentId = req.params.commentId;
    const comments = req.body.comments;
    Boycott.findById(boycottId)
      .then((boycott) => {
        if (!boycott) {
          const error = new Error("No boycott found");
          error.statusCode = 404;
          throw error;
        }
        const comment = boycott.comments.find((c) => c._id.toString() === commentId);
        if (!comment) {
          const error = new Error("No comment found");
          error.statusCode = 404;
          throw error;
        }
        comment.comments = comments;
        return boycott.save();
      }
      )
      .then((boycott) => {
        res.status(200).json({ message: "Comment modified", boycott: boycott });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

  