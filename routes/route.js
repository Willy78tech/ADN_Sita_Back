"use strict";

const express = require('express');
const homeController = require('../controllers/homeController');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

// User 6 routes
router.post('/postNewUser', homeController.postNewUser);
router.post('/postLogin', homeController.postLogin);
router.post('/postLogout', homeController.postLogout);
//router.get('/getUserById/:id', homeController.getUserById);
router.get('/getUserByName', homeController.getUserByName);
//router.get('/getAllUser', homeController.getAllUser);
router.put('/putUserById/:id', homeController.putUserById);
router.delete('/deleteUserById/:id', homeController.deleteUserById);

// Boycott 7 routes
router.post('/postNewBoycott/:id', homeController.postNewBoycott);
router.post('/postBoycottParticipation', homeController.postBoycottParticipation);
//router.get('/getBoycottById', homeController.getBoycottById);
router.get('/getBoycottByName', homeController.getBoycottByName);
router.get('/getAllBoycott', homeController.getAllBoycott);
router.put('/putBoycottById/:id', homeController.putBoycottById);
router.delete('/deleteBoycottById/:id', homeController.deleteBoycottById);
router.delete('/deleteBoycottParticipation', homeController.deleteBoycottParticipation);

// Follow 3 routes
router.post('/postFollow', homeController.postFollow);
router.get('/getFollow', homeController.getFollow);
router.delete('/deleteFollow', homeController.deleteFollow);

// Followed 3 routes
router.post('/postFollowed', homeController.postFollowed);
router.get('/getFollowed', homeController.getFollowed);
router.delete('/deleteFollowed', homeController.deleteFollowed);

module.exports = router;