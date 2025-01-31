const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const tasksRoutes = require('./routes/tasks.routes');

const app = express();
const port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || 'dev';

app.use(logger(logLevel));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/tasks', tasksRoutes); 

app.listen(port, function() {
    console.log(`Running on port: ${port}...`);
});