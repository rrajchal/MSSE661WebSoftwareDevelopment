const bcrypt = require('bcrypt');
const crud = require('../../../database/crud');
require('../../db-config'); 

// Register user
exports.registerUser = function(req, res) {
  const { username, email, password } = req.body;

  // Check if all fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
      status: 400
    });
  }

  // Hash the password
  bcrypt.hash(password, 10, function(err, hash) {
    if (err) {
      return res.status(500).json({
        message: "Internal server error",
        status: 500
      });
    }

    // Insert the new user
    crud.insertUser(username, email, hash, function(err, result) {
      if (err) {
        return res.status(500).json({
          message: "Internal server error",
          status: 500
        });
      }

      res.status(201).json({
        message: "User registered successfully",
        status: 201
      });
    });
  });
};

// Login user
exports.login = function(req, res) {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required",
      status: 400
    });
  }

  // Get user by username
  crud.getUserByUsername(username, function(err, result) {
    if (err) {
      return res.status(500).json({
        message: "Internal server error",
        status: 500
      });
    }

    if (result.length === 0) {
      return res.status(401).json({
        message: "Invalid username or password",
        status: 401
      });
    }

    const user = result[0];

    // Compare password with the stored hash
    bcrypt.compare(password, user.password, function(err, isMatch) {
      if (err) {
        return res.status(500).json({
          message: "Internal server error",
          status: 500
        });
      }

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid username or password",
          status: 401
        });
      }

      res.status(200).json({
        message: "Login successful",
        status: 200
      });
    });
  });
};
