"use strict";

// const boycott = require("../models/boycott");
const Boycott = require("../models/boycott");

exports.getBoycotts = (req, res, next) => {
  Boycott.find()
    .then((boycott) => {
      if (!boycott) {
        const error = new Error("No boycott found...");
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({
        boycott: boycott,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getBoycott = (req, res, next) => {
  const boycottId = req.params.boycottId;
  Boycott.findOne({boycottId:boycottId})
    .then((boycott) => {
      if (!boycott) {
        const error = new Error("No boycott found...");
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({
        boycott: boycott,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createBoycott = (req, res, next) => {
  const target = req.body.target;
  const description = req.body.description;
  const summary = req.body.summary;
  const boycott = new Boycott({
    target: target,
    description: description,
    summary: summary,
    userId: req.user.userId
  });
  boycott
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Boycott créé avec succès !",
        post: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.modBoycott = (req, res, next) => {
  const boycottId = req.params.boycottId;
  const target = req.body.target;
  const description = req.body.description;
  const summary = req.body.summary;
  Boycott.findById(boycottId)
    .then((boycott) => {
      if (!boycott) {
        const error = new Error("No boycott found");
        error.statusCode = 404;
        throw error;
      }
      boycott.target = target;
      boycott.description = description;
      boycott.summary = summary;
      return boycott.save();
    })
    .then((boycott) => {
      res.status(200).json({ message: "Boycott updated", boycott: boycott });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteBoycott = (req,res,next) => {
  const boycottId = req.params.boycottId;
  Boycott.findById(boycottId)
  .then((boycott) => {
    if(!boycott) {
      const error = new Error ("No boycott found");
      error.statusCode = 404;
      throw error;
    }
    return boycott.deleteOne();
  })
  .then((boycott) => {
    res.status(200).json({ message: "Boycott deleted", boycott: boycott });
  })
  .catch((err) => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
}


exports.getBoycottTarget = (req, res, next) => {
  const target = req.params.target;
  Boycott.findOne({target:target})
    .then((boycott) => {
      if (!boycott) {
        const error = new Error("There is no %s boycott", target);
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ boycott: boycott });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
