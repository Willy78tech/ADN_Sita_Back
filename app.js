"use strict";

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

// parse application/json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));  

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//routes
const boyCottRoutes = require("./routes/boycott");
app.use(boyCottRoutes);
const authRoutes = require("./routes/auth");
app.use(authRoutes);
const userRoutes = require("./routes/user");
app.use(userRoutes);
const followerRoutes = require("./routes/follower");
app.use(followerRoutes);
const commentRoutes = require("./routes/comment");
app.use(commentRoutes);
const reportRoutes = require("./routes/report");
app.use(reportRoutes);

const errorController = require("./controllers/errorController");
app.use(errorController.get404);

// Gestion des erreurs
// "Attrappe" les erreurs envoyé par "throw"
app.use(function (err, req, res, next) {
  console.log('err', err);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).json({ message: err.message, statusCode: err.statusCode });
});

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Node.js est à l\'écoute sur le port %s ', PORT);
    });
  })
  .catch(err => console.log(err));
