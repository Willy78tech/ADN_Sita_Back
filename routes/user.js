"use strict";
const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");


router.get("/get-user/:userId", userController.getUser);
router.post("/mod-user/:userId", userController.modUser);
router.delete("/delete-user/:userId", userController.deleteUser);


module.exports = router;