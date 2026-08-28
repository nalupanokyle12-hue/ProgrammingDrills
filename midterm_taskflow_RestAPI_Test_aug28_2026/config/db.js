// config/db.js
// Sets up ONE MySQL connection pool that the whole app shares.
// A pool keeps a small set of open connections ready to reuse,
// which is much faster than opening/closing a new connection per request.

const mysql = require("mysql2/promise"); // promise version lets us use async/await

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // max simultaneous connections in the pool
  queueLimit: 0
});

module.exports = pool;
