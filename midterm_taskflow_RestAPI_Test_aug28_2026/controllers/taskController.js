// controllers/taskController.js
// This is where the actual work happens for each request:
// read input -> validate -> query the database -> send a JSON response.

const pool = require("../config/db");

const ALLOWED_STATUS = ["Pending", "In Progress", "Done"];
const ALLOWED_PRIORITY = ["Low", "Medium", "High"];

// Checks the fields of a task before it touches the database.
// Returns an array of error messages (empty array = valid).
function validateTask(data, { partial = false } = {}) {
  const errors = [];
  const { title, status, priority, due_date } = data;

  // When partial = true (used for PUT), a field is only checked
  // if the client actually sent it.
  const has = (field) => Object.prototype.hasOwnProperty.call(data, field);

  if (!partial || has("title")) {
    if (!title || typeof title !== "string" || title.trim() === "") {
      errors.push("title is required and cannot be empty.");
    }
  }

  if (!partial || has("status")) {
    if (!status || !ALLOWED_STATUS.includes(status)) {
      errors.push(`status must be one of: ${ALLOWED_STATUS.join(", ")}`);
    }
  }

  if (!partial || has("priority")) {
    if (!priority || !ALLOWED_PRIORITY.includes(priority)) {
      errors.push(`priority must be one of: ${ALLOWED_PRIORITY.join(", ")}`);
    }
  }

  if (has("due_date") && due_date !== null && due_date !== "") {
    const isValidDate = !isNaN(Date.parse(due_date));
    if (!isValidDate) {
      errors.push("due_date must be a valid date (e.g. 2026-08-30).");
    }
  }

  return errors;
}

// GET /api/tasks
exports.getAllTasks = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tasks ORDER BY id DESC");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve tasks." });
  }
};

// GET /api/tasks/:id
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve task." });
  }
};

// POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    const errors = validateTask(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: "Invalid input.", errors });
    }

    const { title, description, status, priority, due_date } = req.body;

    const [result] = await pool.query(
      `INSERT INTO tasks (title, description, status, priority, due_date)
       VALUES (?, ?, ?, ?, ?)`,
      [title, description || null, status, priority, due_date || null]
    );

    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [
      result.insertId
    ]);

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create task." });
  }
};

// PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Make sure the task exists first, so we return 404 instead of
    // silently updating zero rows.
    const [existingRows] = await pool.query(
      "SELECT * FROM tasks WHERE id = ?",
      [id]
    );
    if (existingRows.length === 0) {
      return res.status(404).json({ message: "Task not found." });
    }

    const errors = validateTask(req.body, { partial: true });
    if (errors.length > 0) {
      return res.status(400).json({ message: "Invalid input.", errors });
    }

    // Merge existing values with whatever fields the client sent,
    // so a PUT can update just one field without wiping the rest.
    const current = existingRows[0];
    const title = req.body.title ?? current.title;
    const description = req.body.description ?? current.description;
    const status = req.body.status ?? current.status;
    const priority = req.body.priority ?? current.priority;
    const due_date = req.body.due_date ?? current.due_date;

    await pool.query(
      `UPDATE tasks
       SET title = ?, description = ?, status = ?, priority = ?, due_date = ?
       WHERE id = ?`,
      [title, description, status, priority, due_date, id]
    );

    const [updatedRows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [
      id
    ]);

    res.status(200).json(updatedRows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update task." });
  }
};

// DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const [existingRows] = await pool.query(
      "SELECT * FROM tasks WHERE id = ?",
      [id]
    );
    if (existingRows.length === 0) {
      return res.status(404).json({ message: "Task not found." });
    }

    await pool.query("DELETE FROM tasks WHERE id = ?", [id]);

    res.status(200).json({ message: "Task deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete task." });
  }
};
