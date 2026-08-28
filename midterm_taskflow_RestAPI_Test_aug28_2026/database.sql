-- ============================================
-- TaskFlow V2 - Database Setup Script
-- Run this in phpMyAdmin (WAMPServer) or the MySQL CLI
-- ============================================

CREATE DATABASE IF NOT EXISTS taskflow_v2;

USE taskflow_v2;

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    priority VARCHAR(50) NOT NULL DEFAULT 'Medium',
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: a couple of sample rows so GET /api/tasks returns something
-- right away when you first test the API.
INSERT INTO tasks (title, description, status, priority, due_date)
VALUES
    ('Finish database project', 'Complete the REST API activity', 'Pending', 'High', '2026-08-30'),
    ('Review lecture notes', 'Go over Advanced Database Systems slides', 'In Progress', 'Medium', '2026-08-28');
