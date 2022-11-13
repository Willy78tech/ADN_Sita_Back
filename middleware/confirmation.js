"Use strict";

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require("../models/user");
dotenv.config();


// middleware de confirmation de l'inscription
module.exports = (req, res, next) => {   
    const token = req.params.token;
    User.findOne({ token: token
     })
     .then((user) => {
       if (!user) {
         const error = new Error("No user found");
         error.statusCode = 404;
         throw error;
       }
       return user.updateOne({ token: null, confirmed: true });
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
