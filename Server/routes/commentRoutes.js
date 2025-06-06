const express = require('express');
const router = express.Router();
const { getSingleComment, updateComment } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:postId/:commentId', protect, getSingleComment);
router.put('/:postId/:commentId', protect, updateComment);

module.exports = router;