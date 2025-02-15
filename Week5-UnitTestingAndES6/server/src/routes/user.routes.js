const express = require('express');
const controller = require('../controller/user.controller');

const userRoutes = express.Router();

// Just for testing
userRoutes.get('/getUsers', controller.getUsers);

// Get all users
userRoutes.get('/getAllUsers', controller.getAllUsers);

// Get user by ID
userRoutes.get('/:userId', controller.getUserById);

module.exports = userRoutes;
