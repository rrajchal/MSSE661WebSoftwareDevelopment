const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const tasksRoutes = require('./src/routes/tasks.routes');
const middleware = require('./src/middleware/errors.middleware');
require('./db-config')

const app = express();
const port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || 'dev';

// Middleware - logs server requests to console
app.use(logger(logLevel));

// Middleware - parses incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// API endpoints
app.use('/api/auth', authRoutes); // http://localhost:3000/api/auth
app.use('/api/user', userRoutes); // http://localhost:3000/api/users
app.use('/api/tasks', tasksRoutes); // http://localhost:3000/api/tasks

// Handle 404 requests
app.use(middleware.error404);

// Handle 500 requests - applies mostly to live services
app.use(middleware.error500);

// Listen on server port
app.listen(port, () => {
  console.log(`server.js: Running on port: http://localhost:${port}...`);
});

module.exports = app;