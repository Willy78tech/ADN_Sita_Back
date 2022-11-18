"use strict";
const express = require('express');
const router = express.Router();
const followerController = require('../controllers/followController');
const isActive = require('../middleware/is-active');
const isAuth = require("../middleware/is-auth");

// router.get("/get-followed-users", isAuth, followerController.getFollowing);
router.get("/get-followed-boycotts", isAuth, isActive, followerController.getBoycotting);
// router.get("/get-followers", isAuth, followerController.getFollowers);

// router.post("/follow-user/:userId", isAuth, followerController.followUser);
// router.post("/unfollow-user/:userId", isAuth, followerController.unfollowUser);
router.post("/follow-boycott/:boycottId", isAuth, isActive, followerController.followBoycott);
router.post("/unfollow-boycott/:boycottId", isAuth, isActive, followerController.unfollowBoycott);

module.exports = router;