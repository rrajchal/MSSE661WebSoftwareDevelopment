const express = require("express");
const controller = require("../controller/user.controller");

const userRoutes = express.Router();

userRoutes.get("/", controller.getUsers);

module.exports = userRoutes;
