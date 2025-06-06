const express = require('express');
const router = express.Router();
const { getSingleComment } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:postId/:commentId', protect, getSingleComment);

module.exports = router;