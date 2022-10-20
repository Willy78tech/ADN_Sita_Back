
const express = require('express');
const isAuth = require('../middleware/is-auth');


const router = express.Router();

const postsController = require('../controllers/postsController');

// / => GET
router.get('/posts', postsController.getPosts);

// POST
router.post('/post', isAuth, postsController.createPost);


module.exports = router;