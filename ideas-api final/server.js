require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware");
const db = require("./init-db");

const app = express();

/* -------------------- CONFIG -------------------- */
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret"; // fallback for dev only
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://myfrontend.com"]
    : ["http://localhost:3000"];

/* -------------------- CORS -------------------- */
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Environment info
if (process.env.NODE_ENV === "development") {
  console.log("Running in development mode");
} else if (process.env.NODE_ENV === "production") {
  console.log("Running in production mode");
}

/* -------------------- ROUTES -------------------- */
// Health check
app.get("/", (req, res) => {
  res.json({ success: true, message: "API is running" });
});

// ===== USER AUTH =====
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
  db.run(query, [username, hashedPassword], function (err) {
    if (err) {
      return res
        .status(400)
        .json({ error: "User already exists or invalid data" });
    }
    res.json({
      success: true,
      user: { id: this.lastID, username },
    });
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }
  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
    if (err || !user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    res.json({ success: true, token });
  });
});

// ===== IDEAS CRUD =====
app.get("/ideas", (req, res) => {
  let query = "SELECT * FROM ideas";
  const params = [];
  const conditions = [];

  if (req.query.status) {
    conditions.push("status = ?");
    params.push(req.query.status);
  }
  if (req.query.userId) {
    conditions.push("userId = ?");
    params.push(req.query.userId);
  }
  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }
  if (req.query.sort) {
    const validSortColumns = ["title", "status", "id"];
    const column = validSortColumns.includes(req.query.sort)
      ? req.query.sort
      : "id";
    const order = req.query.order === "desc" ? "DESC" : "ASC";
    query += ` ORDER BY ${column} ${order}`;
  }
  if (req.query._limit) {
    const limit = parseInt(req.query._limit, 10) || 10;
    const page = parseInt(req.query._page, 10) || 1;
    const offset = (page - 1) * limit;
    query += ` LIMIT ${limit} OFFSET ${offset}`;
  }

  db.all(query, params, (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ success: true, count: rows.length, data: rows });
  });
});

app.post("/ideas", auth, (req, res) => {
  const { title, description, status } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, error: "Title is required" });
  }
  const query = `INSERT INTO ideas (title, description, status, userId) VALUES (?, ?, ?, ?)`;
  db.run(query, [title, description, status, req.user.id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({
      success: true,
      idea: {
        id: this.lastID,
        title,
        description,
        status,
        userId: req.user.id,
      },
    });
  });
});

app.get("/ideas/:id", auth, (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM ideas WHERE id = ? AND userId = ?";
  db.get(query, [id, req.user.id], (err, row) => {
    if (err)
      return res.status(500).json({ success: false, error: err.message });
    if (!row)
      return res.status(404).json({ success: false, error: "Idea not found" });
    res.json({ success: true, idea: row });
  });
});

app.put("/ideas/:id", auth, (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, error: "Title is required" });
  }
  const query = `
    UPDATE ideas
    SET title = ?, description = ?, status = ?
    WHERE id = ? AND userId = ?
  `;
  db.run(query, [title, description, status, id, req.user.id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    if (this.changes === 0) {
      return res
        .status(403)
        .json({ message: "Not authorized or idea not found" });
    }
    res.json({ success: true, message: "Idea updated" });
  });
});

app.delete("/ideas/:id", auth, (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM ideas WHERE id = ? AND userId = ?`;
  db.run(query, [id, req.user.id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    if (this.changes === 0) {
      return res
        .status(403)
        .json({ message: "Not authorized or idea not found" });
    }
    res.json({ success: true, message: "Idea deleted" });
  });
});

/* -------------------- ERROR HANDLER -------------------- */
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).json({ success: false, error: "Internal Server Error" });
});

module.exports = app;
