"use strict";
const express = require("express");
const router = express.Router();
const boycottController = require("../controllers/boycottController");
const isAuth = require("../middleware/is-auth");


router.get("/get-boycotts", boycottController.getBoycotts);
router.get("/get-boycott/:boycottId", boycottController.getBoycott);
router.get("/get-boycott-title/:title",isAuth, boycottController.getBoycottTitle);


router.post("/add-boycott", isAuth, boycottController.createBoycott);
router.post("/mod-boycott/:boycottId", isAuth, boycottController.modBoycott);

router.delete("/delete-boycott/:boycottId", isAuth, boycottController.deleteBoycott);


module.exports = router;