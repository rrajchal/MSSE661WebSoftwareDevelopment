const express = require("express");
const controller = require("../controller/auth.controller");

const authRoutes = express.Router();

authRoutes.post("/register", controller.registerUser);
authRoutes.post("/login", controller.login);
//authRoutes.post("/logout", controller.logout);
//authRoutes.post("/token", controller.token);

module.exports = authRoutes;