// routes/taskRoutes.js
// Maps each HTTP method + URL pattern to the controller function
// that should handle it. No business logic lives here on purpose.

const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/", taskController.getAllTasks);       // GET    /api/tasks
router.get("/:id", taskController.getTaskById);     // GET    /api/tasks/:id
router.post("/", taskController.createTask);        // POST   /api/tasks
router.put("/:id", taskController.updateTask);       // PUT    /api/tasks/:id
router.delete("/:id", taskController.deleteTask);    // DELETE /api/tasks/:id

module.exports = router;
