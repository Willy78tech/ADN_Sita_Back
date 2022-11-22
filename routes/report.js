"use strict";
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const isAuth = require("../middleware/is-auth");
const isAdmin = require("../middleware/is-admin");
const isActive = require('../middleware/is-active');

router.post("/report-boycott/:boycottId", isAuth, isActive, reportController.reportBoycott);
router.delete("/clear-reports/:boycottId", isAuth, isActive, isAdmin,  reportController.clearReports);
router.get("/get-reports", isAuth, isActive, isAdmin, reportController.getReportedBoycotts);

module.exports = router;