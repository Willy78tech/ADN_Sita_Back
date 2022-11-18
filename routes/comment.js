"use strict";
const express = require('express');
const router = express.Router();
const commentController = require("../controllers/commentController");
const isAuth = require("../middleware/is-auth");
const isActive = require("../middleware/is-active");

// route pour ajouter un commentaire à un boycott
router.post("/add-comment/:boycottId", isAuth, isActive, commentController.addComment);
// route pour supprimer un commentaire à un boycott
router.delete("/delete-comment/:boycottId", isAuth, isActive, commentController.deleteComment);
// route pour modifier un commentaire à un boycott
router.put("/mod-comment/:boycottId", isAuth, isActive, commentController.modComment);

module.exports = router;