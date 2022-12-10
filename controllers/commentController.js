"use strict";

const boycott = require("../models/boycott");
const Boycott = require("../models/boycott");
const Comment = require("../models/comment");
const User = require("../models/user");

exports.addComment = (req, res, next) => {
  const boycottId = req.params.boycottId;
  const comment = req.body.comment;
  const userId = req.user.userId;
  Boycott.findById(boycottId)
    .then((boycott) => {
      const opinion = new Comment({
        comment: comment,
        userId: userId,
        boycottId: boycottId,
      });
      boycott.comments.push(opinion._id), opinion.save();
      boycott.save().then((result) => {
        res.status(201).json({
          message: "Comment added",
          post: result,
        });
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteComment = (req, res, next) => {
  const commentId = req.params.commentId;
  const userId = req.user.userId;
  Comment.findById(commentId)
    .then((comment) => {
      if (!comment) {
        const error = new Error("Comment not found...");
        error.statusCode = 404;
        throw error;
      } else if (boycott) {
        User.findById(userId)
          .then((user) => {
            if (user.isAdmin == false && comment.userId != userId) {
              const error = new Error("Not authorized...");
              error.statusCode = 401;
              throw error;
            } else {
              const boycottId = comment.boycottId;
              boycott.findById(boycottId).then((boycott) => {
                console.log("BOYCOTT", boycott);
                let index = boycott.comments.indexOf(commentId);
                console.log("COMMENTID", commentId);
                console.log("Index", index);
                if (index != -1) {
                  boycott.comments.splice(index, 1);
                }
                boycott.save();
                res.status(200).send();
                comment.deleteOne();
              });
            }
          })
          .catch((err) => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
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

exports.modComment = (req, res, next) => {
  const commentId = req.params.commentId;
  let comment = req.body.comment;
  Comment.findById(commentId)
    .then((result) => {
      if (!result) {
        const error = new Error("No comment found");
        error.statusCode = 404;
        throw error;
      }
      if (comment == "") {
        comment = result.comment;
      } else {
        result.comment = comment;
      }
      return result.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Comment updated", post: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getComments = (req, res, next) => {
  Comment.find()
    .populate({ path: "userId", select: "pseudo" })
    .then((comments) => {
      if (!comments) {
        const error = new Error("No comments...");
        error.statusCode = 404;
        throw error;
      } else {
        res.status(200).json({ comments: comments });
      }
    })
    .catch((err) => {
      if (!err) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getCommentById = (req, res, next) => {
  const commentId = req.params.commentId;
  Comment.findById(commentId)
  .then((comments) => {
    if (!comments) {
      const error = new Error("No comments...");
      error.statusCode = 404;
      throw error;
    } else {
      res.status(200).json({ comment: comments });
    }
  })
  .catch((err) => {
    if (!err) {
      err.statusCode = 500;
    }
    next(err);
  });
};

// fonction qui permet d'ajouter un commentaire sur un boycott
// exports.addComment = (req, res, next) => {
//     const boycottId = req.params.boycottId;
//     const userId = req.user.userId;
//     const comments = req.body.comments;
//     Boycott.findById(boycottId)
//       .then((boycott) => {
//         if (!boycott) {
//           const error = new Error("No boycott found...");
//           error.statusCode = 404;
//           throw error;
//         } else {
//           boycott.comments.push(comments);
//           boycott.save();
//           res.status(201).json({
//             message: "Comment added",
//             post: boycott,
//           });
//         }
//       }
//       )
//       .catch((err) => {
//         if (!err.statusCode) {
//           err.statusCode = 500;
//         }
//         next(err);
//       }
//       );
// };

// supprimer un commentaire sur un boycott
// exports.deleteComment = (req, res, next) => {
//     const boycottId = req.params.boycottId;
//     const commentId = req.params.commentId;
//     Boycott.findById(boycottId)
//       .then((boycott) => {
//         if (!boycott) {
//           const error = new Error("No boycott found");
//           error.statusCode = 404;
//           throw error;
//         }
//         const comment = boycott.comments.find((c) => c._id.toString() === commentId);
//         if (!comment) {
//           const error = new Error("No comment found");
//           error.statusCode = 404;
//           throw error;
//         }
//         comment.remove();
//         return boycott.save();
//       }
//       )
//       .then((boycott) => {
//         res.status(200).json({ message: "Comment deleted", boycott: boycott });
//       })
//       .catch((err) => {
//         if (!err.statusCode) {
//           err.statusCode = 500;
//         }
//         next(err);
//       });
//   };

// modifier un commentaire sur un boycott
// exports.modComment = (req, res, next) => {
//     const boycottId = req.params.boycottId;
//     const commentId = req.params.commentId;
//     const comments = req.body.comments;
//     Boycott.findById(boycottId)
//       .then((boycott) => {
//         if (!boycott) {
//           const error = new Error("No boycott found");
//           error.statusCode = 404;
//           throw error;
//         }
//         const comment = boycott.comments.find((c) => c._id.toString() === commentId);
//         if (!comment) {
//           const error = new Error("No comment found");
//           error.statusCode = 404;
//           throw error;
//         }
//         comment.comments = comments;
//         return boycott.save();
//       }
//       )
//       .then((boycott) => {
//         res.status(200).json({ message: "Comment modified", boycott: boycott });
//       })
//       .catch((err) => {
//         if (!err.statusCode) {
//           err.statusCode = 500;
//         }
//         next(err);
//       });
//   };
