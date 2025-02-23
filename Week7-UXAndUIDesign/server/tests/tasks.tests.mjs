import { expect } from "chai";
import fetch from "node-fetch";

describe("Tasks API Service", () => {
  it("should GET all tasks", async () => {
    const resp = await fetch("http://localhost:3000/api/tasks");
    expect(resp.status).to.equal(200);
    const data = await resp.json();
    expect(data).to.be.an("array");
    expect(data.length).to.not.equal(0);
  });

  it("should GET a single task by ID", async () => {
    const resp = await fetch("http://localhost:3000/api/tasks/2");
    expect(resp.status).to.equal(200);
    const data = await resp.json();
    expect(data).to.be.an("object");
    expect(data.task_id).to.equal(2);
    expect(data.description).to.equal("Task 2 description");
  });

  it("should CREATE a new task", async () => {
    const newTask = {
      description: "New task",
      completed: false,
    };
    const resp = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    expect(resp.status).to.equal(201);
    const data = await resp.json();
    expect(data).to.be.an("object");
    expect(data).to.have.property("message").eql("Task created successfully");
    expect(data).to.have.property("taskId");
  });

  it("should UPDATE a task", async () => {
    const updatedTask = {
      description: "Updated task description",
      completed: true,
    };
    const resp = await fetch("http://localhost:3000/api/tasks/1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    expect(resp.status).to.equal(200);
    const data = await resp.json();
    expect(data).to.be.an("object");
    expect(data).to.have.property("message").eql("Task updated successfully");
  });
});
