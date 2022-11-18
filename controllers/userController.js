"use strict";
// const user = require("../models/user");
const User = require("../models/user");

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .select("pseudo city country quote")
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
    .select("pseudo city country quote")
    .then((users) => {
      if (!users) {
        const error = new Error("Aucun utilisateur trouvé");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ users: users });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.modUser = (req, res, next) => {
  const userId = req.params.userId;
  let pseudo = req.body.pseudo;
  let email = req.body.email;
  let city = req.body.city;
  let country = req.body.country;
  let quote = req.body.quote;
  let password = req.body.password;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("No user found");
        error.statusCode = 404;
        throw error;
      }
      if (pseudo == "") {
        pseudo = user.pseudo;
      } else {
        user.pseudo = pseudo;
      }
      if (email == "") {
        email = user.email;
      } else {
        user.email = email;
      }
      if (city == "") {
        city = user.city;
      } else {
        user.city = city;
      }
      if (country == "") {
        country = user.country;
      } else {
        user.country = country;
      }
      if (quote == "") {
        quote = user.quote;
      } else {
        user.quote = quote;
      }
      if (password == "") {
        password = user.password;
      } else {
        user.password = password;
      }
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
      user.deleteOne();
      res.status(200).send();
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
  User.find({ pseudo: pseudo })
    .select("pseudo city country quote")
    .then((user) => {
      if (user.length == 0) {
        const error = new Error("There is no " + pseudo);
        error.statusCode = 404;
        throw error;
      } else {
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

exports.deletePseudo = (req, res, next) => {
  const pseudo = req.params.pseudo;
  User.findOne({ pseudo: pseudo })
    .then((user) => {
      if (!user) {
        const error = new Error("No user found");
        error.statusCode = 404;
        throw error;
      }
      user.deleteOne();
      res.status(200).send();
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.activateAccount = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("No user found");
        error.statusCode = 404;
        throw error;
      }
      user.isActive = true;
      return user.save();
    })
    .then((user) => {
      res.status(200).json({ message: "User confirmed", user: user });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.logout = (req, res) => {
  res.app.locals.decodedToken = null;
  res.status(200).json({ message: "Déconnexion réussie" });
  res.redirect("/");
};
