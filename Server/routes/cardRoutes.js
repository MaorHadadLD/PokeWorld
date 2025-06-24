const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const {
    addCard,
    getMyCards,
    deleteCard,
} = require('../controllers/cardController');

router.post('/', protect, addCard);
router.get('/', protect, getMyCards);
router.delete('/:id', protect, deleteCard);

module.exports = router;