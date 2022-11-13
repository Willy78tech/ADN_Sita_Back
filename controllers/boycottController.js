"use strict";

// const boycott = require("../models/boycott");
const Boycott = require("../models/boycott");
const nodeFetch = require("node-fetch");
const FormData = require("form-data");
const sharp = require("sharp");

exports.getBoycotts = (req, res, next) => {
  Boycott.find()
    .populate("userId")
    .populate("followers")  
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

  Boycott.findById(boycottId)
    .populate("userId")
    .populate("followers")
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
  if (!req.file) {
    const error = new Error("No image provided");
    error.statusCode = 422;
    throw error;
  }
  const image = req.file;
  const resize = sharp(image.buffer).resize({width: 500}).jpeg({quality: 80});
  const formdata = new FormData();
  formdata.append("image", resize, {
    contentType: image.mimetype,
    filename: image.originalname,
  });
  

  nodeFetch("https://images.kalanso.top/image/?api=H29DISK", {
      method: "POST",
      body: formdata,
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.status === "success") {
    const title = req.body.title;
    const description = req.body.description;
    const summary = req.body.summary;
    const boycott = new Boycott({
      title: title,
      description: description,
      summary: summary,
      userId: req.user.userId,
      imageUrl: data.filename
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
    } else {
      const error = new Error("Image upload failed");
      error.statusCode = 500;
      throw error;
    }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
    );
};

exports.modBoycott = (req, res, next) => {
  const boycottId = req.params.boycottId;
  const title = req.body.title;
  const description = req.body.description;
  const summary = req.body.summary;

  Boycott.findById(boycottId)
    .then((boycott) => {
      if (!boycott) {
        const error = new Error("No boycott found");
        error.statusCode = 404;
        throw error;
      }
      boycott.title = title;
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
  .then(() => {
    res.status(204).json();
  })
  .catch((err) => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};


exports.getBoycottTitle = (req, res, next) => {
  const title = req.params.title;
  
  Boycott.findOne({title:title})
    .then((boycott) => {
      if (!boycott) {
        const error = new Error("There is no " + title + " boycott");
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

exports.getMyBoycottsCreated = (req, res, next) => {
  const userId = req.params.userId;
  Boycott.find({
      userId: userId
    })
    .then(boycotts => {
      if (!boycotts) {
        const error = new Error('Aucun boycott trouvé');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        boycotts: boycotts
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
