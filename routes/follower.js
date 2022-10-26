"use strict";
const express = require('express');
const router = express.Router();
const followerController = require('../controllers/followController');
const isAuth = require("../middleware/is-auth");

router.get("/get-followed-users", isAuth, followerController.getMyFollowedUsers)

router.post("/follow-user/:userId", isAuth, followerController.followUser);
router.post("/follow-boycott/:boycottId", isAuth, followerController.followBoycott);


module.exports = router;