const express = require('express');
const controller = require('../controller/user.controller');

const userRoutes = express.Router();

// Get all users
userRoutes.get('/', controller.getAllUsers);

// Get user by ID
userRoutes.get('/:userId', controller.getUserById);

module.exports = userRoutes;
