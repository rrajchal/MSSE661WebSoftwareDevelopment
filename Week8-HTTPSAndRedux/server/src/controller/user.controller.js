const db = require('./../../db-config'); 
const queries = require('./../../../database/queries/user.queries'); 

// Get all users
exports.getAllUsers = (req, res) => {
  db.query(queries.GET_ALL_USERS, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(result);
  });
};

// Get user by ID
exports.getUserById = (req, res) => {
  const userId = req.params.userId;
  db.query(queries.GET_USER_BY_ID, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(result[0]);
  });
};

// Just for testing
exports.getUsers = function(req, res) {
  res.status(200).json({
    message: "Get Users Endpoint",
    status: 200
  });
};
