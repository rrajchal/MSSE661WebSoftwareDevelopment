import express, { Request, Response, NextFunction } from 'express';
const controller = require('../controller/auth.controller');
const jwtHelper = require('../utils/jwt-helpers');

const authRoutes = express.Router();

authRoutes.post('/register', controller.registerUser);
authRoutes.post('/login', controller.login);
authRoutes.post('/token', jwtHelper.token);
authRoutes.post('/logout', jwtHelper.logout);

// Protect routes with token verification
authRoutes.use(controller.verifyToken);

module.exports = authRoutes;
export default authRoutes;
