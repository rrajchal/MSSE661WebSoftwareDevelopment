import express from 'express'
const authController = require("../controller/auth.controller");
const jwtHelper = require('../utils/jwt-helpers');

const authRoutes = express.Router();

authRoutes.post("/register", authController.registerUser);
authRoutes.post("/login", authController.login);
authRoutes.post("/token", jwtHelper.token);   // Refresh token endpoint
authRoutes.post("/logout", jwtHelper.logout); // Logout endpoint

// Protect routes with token verification
authRoutes.use(authController.verifyToken);

export { authRoutes };

