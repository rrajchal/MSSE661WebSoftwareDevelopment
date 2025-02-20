/**
 * CRUD - Create, Read, Update, Delete
 * POST - Create
 * GET - Read
 * PUT - Update
 * DELETE - Delete
 */

const db = require("../../db-config");
const queries = require("../../../database/queries/tasks.queries");

// Get all tasks
exports.getAllTasks = (req, res) => {
  db.query(queries.GET_ALL_TASKS, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(result);
  });
};

// Get task by ID
exports.getTaskById = (req, res) => {
  const taskId = req.params.taskId;
  db.query(queries.GET_TASK_BY_ID, [taskId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(result[0]);
  });
};

// Create a new task
exports.createTask = (req, res) => {
  const { description, completed } = req.body;
  db.query(queries.CREATE_TASK, [description, completed], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      message: "Task created successfully",
      taskId: result.insertId,
    });
  });
};

// Update an existing task
exports.updateTask = (req, res) => {
  const { description, completed } = req.body;
  const taskId = req.params.taskId;
  db.query(
    queries.UPDATE_TASK,
    [description, completed, taskId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: "Task updated successfully" });
    }
  );
};

// Delete a task
exports.deleteTask = (req, res) => {
  const taskId = req.params.taskId;
  db.query(queries.DELETE_TASK, [taskId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  });
};
