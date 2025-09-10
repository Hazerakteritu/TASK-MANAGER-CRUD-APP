const express = require('express')
const app = express()
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});



app.use(express.json());


let tasks = [];
let nextId = 1;


// Create a task
app.post("/tasks", (req, res) => {
  const { title, description, status } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: nextId++,
    title,
    description: description || "",
    status: status || "To Do",
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Read all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});


//get task by ID
app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});


// Update task
app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description, status } = req.body;

  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  if (title) task.title = title;
  if (description) task.description = description;
  if (status) task.status = status;

  res.json(task);
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex((t) => t.id === taskId);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const deletedTask = tasks.splice(index, 1);
  res.json({ message: "Task deleted successfully", deletedTask });
});


// Mark task as completed
app.patch("/tasks/:id/complete", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.status = "Completed";
  res.json({ message: "Task marked as completed", task });
});


