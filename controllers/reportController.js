"use strict";
const User = require("../models/user");
const Boycott = require("../models/boycott");
const boycott = require("../models/boycott");

exports.reportBoycott = (req, res, next) => {
  const boycottId = req.params.boycottId;
  const myId = req.user.userId;

  Boycott.findById(boycottId)
    .then((boycott) => {
      if (!boycott) {
        const error = new Error("No boycott found...");
        error.statusCode = 404;
        throw error;
      } else if (boycott.reports.indexOf(myId) == -1) {
        boycott.reports.push(myId);
        boycott.isReport = true;
        boycott.save();
        User.findById(myId).then((user) => {
          user.reporting.push(boycottId);
          user.save();
        });
        res.status(201).json({
          message: "Boycott reported.",
        });
      } else {
        const error = new Error("Boycott already reported.");
        error.statusCode = 404;
        throw error;
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.clearReports = (req, res, next) => {
  const boycottId = req.params.boycottId;
  Boycott.findById(boycottId)
    .then((boycott) => {
      let array = boycott.reports;
      if (array.length == 0) {
        const error = new Error("No reports for this boycott...");
        error.statusCode = 404;
        throw error;
      } else {
        while (array.length > 0) {
          array.pop();
        }
        User.find()
          .then((users) => {
            users.forEach((user) => {
              let index = user.reporting.indexOf(boycottId);
              if (index != -1) {
                user.reporting.splice(index, 1);
              }
              return user.save();
            });
          })
          .then(() => {
            res.status(200).json({
              message: "Reports removed.",
            });
          });
        boycott.isReport = false;
        return boycott.save();
      }
    })

    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getReportedBoycotts = (req, res, next) => {
  boycott
    .find()
    .then((boycott) => {
      if (!boycott) {
        const error = new Error("No boycott found...");
        error.statusCode = 404;
        throw error;
      } else {
        let array = [];
        boycott.forEach((boycott) => {
          if (boycott.isReport == true) {
            array.push(boycott);
          }
        });
        res.status(200).json({
          reports: array,
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
