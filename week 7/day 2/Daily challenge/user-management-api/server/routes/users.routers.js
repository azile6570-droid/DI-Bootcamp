const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/users', usersController.getAllUsers);
router.get('/users/:id', usersController.getUserById);
router.put('/users/:id', usersController.updateUser);

module.exports = router;