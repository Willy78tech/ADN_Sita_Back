"use strict";
const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const isAuth = require("../middleware/is-auth");

router.get("/get-user/:userId", isAuth, userController.getUser);
router.get("/get-users", isAuth, userController.getUsers);
router.get("/get-pseudo/:pseudo", isAuth, userController.getPseudo);

router.put("/mod-user/:userId", userController.modUser);

router.delete("/delete-pseudo/:pseudo", isAuth, userController.deletePseudo);
router.delete("/delete-user/:userId", isAuth, userController.deleteUser);


router.get("/confirmation/:userId", userController.confirmation);

router.get('/logout', isAuth, userController.logout);

module.exports = router;