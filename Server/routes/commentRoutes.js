const express = require('express');
const router = express.Router();
const { getSingleComment, updateComment, deleteComment, addComment, getPostComments } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:postId/:commentId', protect, getSingleComment);
router.put('/:postId/:commentId', protect, updateComment);
router.delete('/:postId/:commentId', protect, deleteComment);
router.post('/:postId', protect, addComment);
router.get('/:postId', protect, getPostComments);

module.exports = router;