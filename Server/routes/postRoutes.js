const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, likePost, addComment } = require('../controllers/postController');
const {protect} = require('../middleware/authMiddleware');



router.post('/', protect, createPost);
router.get('/', getAllPosts);
router.post('/:id/like', protect, likePost);
router.post('/:id/comment', protect, addComment);

module.exports = router;