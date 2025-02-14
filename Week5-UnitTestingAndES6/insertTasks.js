/**
 * For see data
 */
const http = require('http');

const tasks = [
  { description: 'Task 1 description', completed: false },
  { description: 'Task 2 description', completed: true },
  { description: 'Task 3 description', completed: false },
  { description: 'Task 4 description', completed: true },
  { description: 'Task 5 description', completed: false },
  { description: 'Task 6 description', completed: true },
  { description: 'Task 7 description', completed: false },
  { description: 'Task 8 description', completed: true },
  { description: 'Task 9 description', completed: false },
  { description: 'Task 10 description', completed: true },
];

const insertTask = (task) => {
  const data = JSON.stringify(task);

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/tasks',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  };

  const req = http.request(options, (res) => {
    let responseData = '';

    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
      console.log(JSON.parse(responseData));
    });
  });

  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  req.write(data);
  req.end();
};

tasks.forEach(insertTask);
