// routes/userRoutes.js
const express = require('express');
const router = express.Router(); 

const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');



router.post('/register', registerUser); 
router.post('/login', loginUser);       

// Action that require a token
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router; 