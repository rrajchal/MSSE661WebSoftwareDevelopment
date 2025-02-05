const CREATE_TASKS_TABLE = `
  CREATE TABLE IF NOT EXISTS tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false
  );
`;

module.exports = {
  CREATE_TASKS_TABLE,
};
