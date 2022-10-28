"use strict";
const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const isAuth = require("../middleware/is-auth");

router.get("/get-user/:userId", isAuth, userController.getUser);
router.get("/get-pseudo/:pseudo", isAuth, userController.getPseudo);

router.post("/mod-user/:userId", userController.modUser);

router.delete("/delete-pseudo/:pseudo", isAuth, userController.deletePseudo);
router.delete("/delete-user/:userId", isAuth, userController.deleteUser);

module.exports = router;