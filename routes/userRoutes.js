const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { changeUserStatus, getAllUsers, login, register, removeUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/users', authMiddleware, getAllUsers);
router.put('/users/:id', authMiddleware, changeUserStatus);
router.delete('/users/:id', authMiddleware, removeUser);

module.exports = router;
