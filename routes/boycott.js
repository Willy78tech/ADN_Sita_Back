"use strict";
const express = require("express");
const router = express.Router();
const boycottController = require("../controllers/boycottController");
const isActive = require("../middleware/is-active");
const isAuth = require("../middleware/is-auth");
const upload = require("../middleware/upload-multer");
const isAdmin = require("../middleware/is-admin");


router.get("/get-boycotts", boycottController.getBoycotts);
router.get("/get-boycott/:boycottId", isAuth, isActive, boycottController.getBoycott);
router.get("/get-boycott-title/:title", isAuth, isActive, boycottController.getBoycottTitle);
router.get("/get-boycott-created/:userId", isAuth, isActive, boycottController.getMyBoycottsCreated);

router.post("/add-boycott", isAuth, isActive, upload.single("image"), boycottController.createBoycott);
router.put("/mod-boycott/:boycottId", isAuth, isActive, boycottController.modBoycott);

router.delete("/delete-boycott/:boycottId", isAuth, boycottController.deleteBoycott);

module.exports = router;