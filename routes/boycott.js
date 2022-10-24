"use strict";
const express = require('express');
// const isAuth = require('../middleware/is-auth');


const router = express.Router();

const boycottController = require('../controllers/boycottController');

// / => GET
router.get('/get-boycotts', boycottController.getBoycotts);

// POST
router.post('/add-boycott', boycottController.createBoycott);


module.exports = router;