const express = require('express');
const tasksController = require('../controller/tasks.controller');

const tasksRoutes = express.Router();

/**
 * Express routes for Tasks.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all tasks. Evaluates to /tasks.
 */
tasksRoutes.get('/', tasksController.getAllTasks);
tasksRoutes.get('/:taskId', tasksController.getTaskById);
tasksRoutes.post('/', tasksController.createTask);
tasksRoutes.put('/:taskId', tasksController.updateTask);
tasksRoutes.delete('/:taskId', tasksController.deleteTask);

module.exports = tasksRoutes;