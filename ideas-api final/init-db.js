const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");

    // Create ideas table if not exists
    db.run(
      `CREATE TABLE IF NOT EXISTS ideas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT,
        userId INTEGER,
        FOREIGN KEY (userId) REFERENCES users(id)
      )`,
      (err) => {
        if (err) {
          console.error("Error creating ideas table:", err.message);
        } else {
          console.log("Ideas table ready.");
        }
      }
    );

    // Create users table
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )`,
      async (err) => {
        if (err) {
          console.error("Error creating users table:", err.message);
        } else {
          console.log("Users table ready.");

          // Insert sample users only if none exist
          db.get(`SELECT COUNT(*) as count FROM users`, async (err, row) => {
            if (row.count === 0) {
              const insert = `INSERT INTO users (username, password) VALUES (?, ?)`;

              const hashed1 = await bcrypt.hash("password123", 10);
              db.run(insert, ["nada", hashed1]);

              const hashed2 = await bcrypt.hash("mypassword", 10);
              db.run(insert, ["salma", hashed2]);
              
              const hashed3 = await bcrypt.hash("mypassword123", 10);
              db.run(insert, ["rana", hashed3]);

              console.log("Sample users added.");
            } else {
              console.log("Users already exist, skipping insert.");
            }
          });
        }
      }
    );

    // Ensure userId column exists in ideas
    db.all(`PRAGMA table_info(ideas)`, (err, columns) => {
      if (err) {
        console.error("Error checking table info:", err.message);
      } else {
        const hasUserId = columns.some((col) => col.name === "userId");
        if (!hasUserId) {
          db.run(
            `ALTER TABLE ideas ADD COLUMN userId INTEGER REFERENCES users(id)`,
            (err) => {
              if (err) {
                console.error("Error adding userId column:", err.message);
              } else {
                console.log("userId column added to ideas table.");
              }
            }
          );
        }
      }
    });
  }
});

module.exports = db;
