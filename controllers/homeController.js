"use strict";

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/user');
const Boycott = require('../models/boycott');

// ****************************************************
//                  User functions
// ****************************************************

exports.postNewUser = (req, res, next) => {
    //tested
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const isAdmin = false;

    bcrypt.hash(password, 12)
        .then(hashedPw => {
            if (password == confirmPassword) {
                const user = new User({
                    userName: userName,
                    email: email,
                    password: hashedPw,
                    isAdmin: isAdmin,
                });
                return user.save();
            }
        })
        .then(result => {
            res.status(201).json({
                message: 'User have been created !',
                userId: result._id
            });
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
}

exports.postLogin = (req, res, next) => {
    //tested
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                const error = new Error('User not found.');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Incorrect password.');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser._id.toString()
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            res.status(200).json({ token: token, userId: loadedUser._id.toString() });
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
}

exports.postLogout = (req, res, next) => {
    res.app.locals.decodedToken = null;
    res.status(200).json({ message: "Deconnection successful." });
    res.redirect("/");
}

// exports.getUserById = (req, res, next) => {
//     const id = req.params.id;

//     User.find({_id: id})
//         .then(user => {
//             console.log(user);
//             return user;
//         })
//         .catch(err => {
//             if (!err.statusCode)
//                 err.statusCode = 500;
//             next(err);
//         });
// }

exports.getUserByName = (req, res, next) => {
    //tested
    const name = req.body.searchInput;

    User.find({ userName: name })
        .then(user => {
            res.status(200).send(user)
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
}

// exports.getAllUser = (req, res, next) => {
//     User.find({})
//         .then(user => {
//             res.status(200).send(user)
//         })
//         .catch(err => {
//             if (!err.statusCode)
//                 err.statusCode = 500;
//             next(err);
//         });
// }

exports.putUserById = (req, res, next) => {
    //tested
    const id = req.params.id;
    const userName = req.body.userName;
    const email = req.body.email;

    User.findByIdAndUpdate({ _id: id })
        .exec()
        .then(user => {
            user.userName = userName;
            user.email = email;
            user.save();
            res.status(200).json({
                message: "Change successful"
            })
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
}

exports.deleteUserById = (req, res, next) => {
    //tested
    const id = req.params.id;

    User.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(201).json("User deleted successfully.");
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
}

// ****************************************************
//                 Boycott functions 
// ****************************************************

exports.postNewBoycott = (req, res, next) => {
    //tested
    const title = req.body.title;
    const summary = req.body.summary;
    const description = req.body.description;
    const image = req.body.image;
    const userId = req.params.id;

    const boycott = new Boycott({
        title: title,
        summary: summary,
        description: description,
        image: image,
        userId: userId
    });

    boycott.save()
        .then(result => {
            res.status(201).json({
                message: 'User have been created !'
            });
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
}

exports.postBoycottParticipation = (req, res, next) => {

}

exports.getBoycottByName = (req, res, next) => {
    //tested
    const boycott = req.body.searchInput;

    Boycott.find({ title: boycott })
        .then(boycott => {
            res.status(200).send(boycott)
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
}

exports.getAllBoycott = (req, res, next) => {
    //tested
    Boycott.find({})
        .then(boycott => {
            res.status(200).send(boycott)
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
}

exports.putBoycottById = (req, res, next) => {
    //tested
    const id = req.params.id;
    const title = req.body.title;
    const summary = req.body.summary;
    const description = req.body.description;
    const image = req.body.image;

    Boycott.findByIdAndUpdate({ _id: id })
        .exec()
        .then(boycott => {
            boycott.title = title;
            boycott.summary = summary;
            boycott.description = description;
            boycott.image = image;
            boycott.save();
            res.status(200).json({
                message: "Change successful"
            })
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
}

exports.deleteBoycottById = (req, res, next) => {
    //tested
    const id = req.params.id;

    Boycott.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(201).json("Boycott deleted successfully.");
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
}

exports.deleteBoycottParticipation = (req, res, next) => {

}

// ****************************************************
//                 Follow functions 
// ****************************************************

exports.postFollow = (req, res, next) => {

}

exports.getFollow = (req, res, next) => {

}

exports.deleteFollow = (req, res, next) => {

}

// ****************************************************
//                 Followed functions 
// ****************************************************

exports.postFollowed = (req, res, next) => {

}

exports.getFollowed = (req, res, next) => {

}

exports.deleteFollowed = (req, res, next) => {

}
