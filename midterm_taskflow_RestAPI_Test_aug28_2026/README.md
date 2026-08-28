# TaskFlow V2 — RESTful Task Management API

A simple, functional RESTful API for managing tasks, built for the Advanced Database Systems / System Integration midterm activity. This project demonstrates REST API architecture, CRUD operations, MySQL database integration, server-side validation, and proper HTTP status code handling.

## Tech Stack

| Layer               | Technology                          |
|----------------------|--------------------------------------|
| Runtime               | Node.js 18+                         |
| Web Framework         | Express.js                          |
| Database              | MySQL / MariaDB (via WAMPServer)    |
| DB Driver              | mysql2 (with connection pooling)    |
| Environment Config     | dotenv                              |
| API Testing            | Thunder Client (VS Code extension)  |

## Project Structure

```
TaskFlow-V2/
├── config/
│   └── db.js               # MySQL connection pool setup
├── controllers/
│   └── taskController.js   # Business logic: validation, queries, responses
├── routes/
│   └── taskRoutes.js       # Maps HTTP methods/URLs to controller functions
├── .env                    # Local environment variables (not committed)
├── .env.example             # Template for required environment variables
├── .gitignore
├── package.json
├── server.js                # App entry point
└── database.sql             # Database + table creation script
```

## Database Schema

**Database:** `taskflow_v2`
**Table:** `tasks`

| Column       | Type          | Constraints                                 |
|--------------|---------------|-----------------------------------------------|
| id           | INT           | PRIMARY KEY, AUTO_INCREMENT                    |
| title        | VARCHAR(255)  | NOT NULL                                       |
| description  | TEXT          | Optional                                       |
| status       | VARCHAR(50)   | NOT NULL (Pending / In Progress / Done)        |
| priority     | VARCHAR(50)   | NOT NULL (Low / Medium / High)                 |
| due_date     | DATE          | Optional                                       |
| created_at   | TIMESTAMP     | Auto-generated (DEFAULT CURRENT_TIMESTAMP)     |

## Setup & Installation

### 1. Set up the database
- Start WAMPServer (icon should be green).
- Open phpMyAdmin → SQL tab → paste and run the contents of `database.sql`.

### 2. Configure environment variables
Copy `.env.example` to `.env` and adjust if needed:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=taskflow_v2
PORT=3000
```

### 3. Install dependencies
```bash
npm install
```

### 4. Start the server
```bash
npm start
```
Server runs at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint         | Description              |
|--------|-------------------|----------------------------|
| GET    | /api/tasks         | Get all tasks              |
| GET    | /api/tasks/:id       | Get a single task by ID    |
| POST   | /api/tasks           | Create a new task           |
| PUT    | /api/tasks/:id         | Update an existing task     |
| DELETE | /api/tasks/:id         | Delete a task                |

### Example Request Body (POST/PUT)
```json
{
  "title": "Finish database project",
  "description": "Complete the REST API activity",
  "status": "Pending",
  "priority": "High",
  "due_date": "2026-08-30"
}
```

### Validation Rules
- `title` — required, cannot be empty
- `status` — must be one of: `Pending`, `In Progress`, `Done`
- `priority` — must be one of: `Low`, `Medium`, `High`
- `due_date` — optional, must be a valid date if provided
- Invalid input returns `400 Bad Request` with an `errors` array

## HTTP Status Codes Used

| Code | Meaning                                |
|------|-------------------------------------------|
| 200  | Successful GET / PUT / DELETE               |
| 201  | Successful POST (resource created)          |
| 400  | Invalid input (failed validation)           |
| 404  | Task not found                              |
| 500  | Unexpected server/database error            |

## Architecture Overview

```
Client
  |
HTTP Request
  |
Express Server (server.js)
  |
Middleware (express.json())
  |
Router (taskRoutes.js)
  |
Controller (taskController.js)
  |
MySQL Connection Pool (config/db.js)
  |
SQL Query (parameterized, via mysql2)
  |
MySQL Database (taskflow_v2)
  |
Query Result
  |
Controller formats response
  |
JSON HTTP Response
  |
Client
```

**Key design decisions:**
- **Connection pooling** instead of per-request connections, for efficiency.
- **Parameterized queries** (`?` placeholders) throughout, to prevent SQL injection — user input is never concatenated directly into SQL strings.
- **Server-side validation** runs before any database interaction, so invalid data never reaches MySQL.
- **Separation of concerns**: routes only map URLs to controllers; controllers hold all logic; the connection pool is isolated in its own config module.
- **No authentication** — intentionally excluded per the activity scope, which focuses on REST architecture, CRUD, and database integration.

## Testing

Tested manually using Thunder Client, covering:
- GET all tasks (200)
- GET task by valid ID (200) and invalid ID (404)
- POST with valid data (201) and invalid data (400)
- PUT to update a task (200) and on a nonexistent task (404)
- DELETE an existing task (200), followed by a confirmation GET (404)

## Author
Kyle — Junior Year, Integrative Programming and Technologies (Midterm Project)
