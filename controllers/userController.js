"use strict";
// const user = require("../models/user");
const User = require("../models/user");

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("No user found");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        user: user,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getUsers = (req, res, next) => {
  User.find()
    .then(users => {
      if (!users) {
        const error = new Error('Aucun utilisateur trouvé');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ users: users });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.modUser = (req, res, next) => {
  const userId = req.params.userId;
  const pseudo = req.body.pseudo;
  const email = req.body.email;
  const quote = req.body.quote;
  const password = req.body.password;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("No user found");
        error.statusCode = 404;
        throw error;
      }
      user.pseudo = pseudo;
      user.email = email;
      user.quote = quote;
      user.password = password;
      return user.save();
    })
    .then((user) => {
      res.status(200).json({ message: "User updated", user: user });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("No user found");
        error.statusCode = 404;
        throw error;
      }
      return user.deleteOne();
    })
    .then((user) => {
      res.status(200).json({ message: "User deleted", user: user });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getPseudo = (req, res, next) => {
  const pseudo = req.params.pseudo;

  User.find({pseudo:pseudo})
    .then((user) => {
      if (user.length == 0) {
        const error = new Error("There is no " + pseudo);
        error.statusCode = 404;
        throw error;
      }
      else {
      res.status(200).json({ user: user });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deletePseudo = (req,res,next) => {
  const pseudo = req.params.pseudo;
  
  User.findOne({pseudo:pseudo})
    .then((user) => {
      if (!user) {
        const error = new Error("No user found");
        error.statusCode = 404;
        throw error;
      }
      return user.deleteOne();
    })
    .then((user) => {
      res.status(200).json({ message: "User deleted", user: user });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });  
}

exports.logout = (req, res) => {
  res.app.locals.decodedToken = null;
  res.status(200).json({ message: 'Déconnexion réussie' });
  res.redirect("/");
};