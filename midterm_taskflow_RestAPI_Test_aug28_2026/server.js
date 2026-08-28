// server.js
// Entry point of the application. This file wires everything together:
// loads config, creates the Express app, applies middleware,
// registers routes, and starts listening for requests.

require("dotenv").config(); // loads variables from .env into process.env

const express = require("express");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());

// Every request to /api/tasks... is handed off to taskRoutes,
// which decides which controller function should run.
app.use("/api/tasks", taskRoutes);

// Simple root route so visiting the server in a browser confirms it's alive.
app.get("/", (req, res) => {
  res.status(200).json({ message: "TaskFlow V2 API is running." });
});

// Catch-all for routes that don't exist.
app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`TaskFlow V2 API running on http://localhost:${PORT}`);
});
