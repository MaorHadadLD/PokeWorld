// routes/userRoutes.js
const express = require('express');
const router = express.Router(); // השתמש רק בזה, או בחר שם אחד והצמד אליו

const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');



router.post('/register', registerUser); // שנה מ-userRouter ל-router
router.post('/login', loginUser);       // שנה מ-userRouter ל-router

// Action that require a token
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router; // וודא שאתה מייצא את אותו ה-router