"use strict";
const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const isAuth = require("../middleware/is-auth");
const isAdmin = require("../middleware/is-admin");
const isActive = require("../middleware/is-active");

router.get("/get-user/:userId", isAuth, isActive, userController.getUser);
router.get("/get-users", isAuth, isActive, userController.getUsers);
router.get("/get-pseudo/:pseudo", isAuth, isActive, userController.getPseudo);

router.put("/mod-user/:userId", userController.modUser);

router.delete("/delete-pseudo/:pseudo", isAuth, isActive, isAdmin, userController.deletePseudo);
router.delete("/delete-user/:userId", isAuth, isActive, isAdmin, userController.deleteUser);

router.get("/activate-account/:userId", userController.activateAccount);

router.get('/logout', isAuth, isActive, userController.logout);

module.exports = router;