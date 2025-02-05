const express = require("express");
const controller = require("../controller/tasks.controller");

const tasksRoutes = express.Router();

tasksRoutes.get("/", controller.getTasks);

module.exports = tasksRoutes;
