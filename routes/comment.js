"use strict";
const express = require('express');
const router = express.Router();
const commentController = require("../controllers/commentController");
const isAuth = require("../middleware/is-auth");
const isActive = require("../middleware/is-active");
const isAdmin = require("../middleware/is-admin");
const isAdminOrLogin = require("../middleware/is-admin-or-login");

router.get("/get-comments", isAuth, isActive, commentController.getComments);
router.get("/get-comment/:commentId", isAuth, isActive, commentController.getCommentById);


router.post("/add-comment/:boycottId", isAuth, isActive, commentController.addComment);

router.delete("/delete-comment/:commentId", isAuth, isActive, commentController.deleteComment);

router.put("/mod-comment/:commentId", isAuth, isActive, commentController.modComment);

module.exports = router;