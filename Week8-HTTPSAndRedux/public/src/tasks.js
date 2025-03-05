async function displayTasks() {
  document.getElementById("tasks-display").style.display = "block";
  document.getElementById("add-task-form").style.display = "none";
  document.getElementById("update-task-form").style.display = "none";
  document.getElementById("delete-task-form").style.display = "none";

  try {
    const response = await fetch("/api/tasks");
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    const tasks = await response.json();
    const tasksTableBody = document.getElementById("tasks-table-body");
    tasksTableBody.innerHTML = ""; // Clear existing rows
    tasks.forEach((task) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${task.task_id}</td>
        <td>${task.description}</td>
        <td>${task.completed ? "Yes" : "No"}</td>
      `;
      tasksTableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    document.getElementById("message").textContent = "Error fetching tasks";
    document.getElementById("message").style.display = "block";
  }
}

function showAddTaskForm() {
  document.getElementById("tasks-display").style.display = "none";
  document.getElementById("add-task-form").style.display = "block";
  document.getElementById("update-task-form").style.display = "none";
  document.getElementById("delete-task-form").style.display = "none";
}

function showUpdateTaskForm() {
  document.getElementById("tasks-display").style.display = "none";
  document.getElementById("add-task-form").style.display = "none";
  document.getElementById("update-task-form").style.display = "block";
  document.getElementById("delete-task-form").style.display = "none";
}

function showDeleteTaskForm() {
  document.getElementById("tasks-display").style.display = "none";
  document.getElementById("add-task-form").style.display = "none";
  document.getElementById("update-task-form").style.display = "none";
  document.getElementById("delete-task-form").style.display = "block";
}

async function addTask(event) {
  event.preventDefault();
  const description = document.getElementById("description").value;
  const completed = document.getElementById("completed").checked;

  try {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description, completed }),
    });

    if (!response.ok) {
      throw new Error("Failed to add task");
    }

    document.getElementById("message").textContent = "Task added successfully";
    document.getElementById("message").style.display = "block";
    displayTasks();
  } catch (error) {
    console.error("Error adding task:", error);
    document.getElementById("message").textContent = "Error adding task";
    document.getElementById("message").style.display = "block";
  }
}

async function updateTask(event) {
  event.preventDefault();
  const taskId = document.getElementById("task-id").value;
  const description = document.getElementById("update-description").value;
  const completed = document.getElementById("update-completed").checked;

  try {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description, completed }),
    });

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    document.getElementById("message").textContent =
      "Task updated successfully";
    document.getElementById("message").style.display = "block";
    displayTasks();
  } catch (error) {
    console.error("Error updating task:", error);
    document.getElementById("message").textContent = "Error updating task";
    document.getElementById("message").style.display = "block";
  }
}

async function deleteTask(event) {
  event.preventDefault();
  const taskId = document.getElementById("delete-task-id").value;

  try {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }

    document.getElementById("message").textContent =
      "Task deleted successfully";
    document.getElementById("message").style.display = "block";
    displayTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
    document.getElementById("message").textContent = "Error deleting task";
    document.getElementById("message").style.display = "block";
  }
}
