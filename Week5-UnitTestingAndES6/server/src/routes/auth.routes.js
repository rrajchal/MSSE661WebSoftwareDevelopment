const express = require("express");
const controller = require("../controller/auth.controller");
const jwtHelper = require('../utils/jwt-helpers');

const authRoutes = express.Router();

authRoutes.post("/register", controller.registerUser);
authRoutes.post("/login", controller.login);
authRoutes.post("/token", jwtHelper.token); // Refresh token endpoint
authRoutes.post("/logout", jwtHelper.logout); // Logout endpoint

// Protect routes with token verification
authRoutes.use(controller.verifyToken);

module.exports = authRoutes;

// authRoutes.post("/logout", controller.logout);

module.exports = authRoutes;