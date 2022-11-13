"use strict";
const express = require('express');
const router = express.Router();
const commentController = require("../controllers/commentController");
const isAuth = require("../middleware/is-auth");


// route pour ajouter un commentaire à un boycott
router.post("/add-comment/:boycottId", isAuth, commentController.addComment);
// route pour supprimer un commentaire à un boycott
router.delete("/delete-comment/:boycottId", isAuth, commentController.deleteComment);
// route pour modifier un commentaire à un boycott
router.put("/mod-comment/:boycottId", isAuth, commentController.modComment);


module.exports = router;