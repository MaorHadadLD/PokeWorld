const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, likePost, addComment } = require('../controllers/postController');

const requireAuth = require('../middleware/authMiddleware');

router.use(requireAuth);

router.post('/', createPost);
router.get('/', getAllPosts);
router.post('/:id/like', likePost);
router.post('/:id/comment', addComment);

module.exports = router;