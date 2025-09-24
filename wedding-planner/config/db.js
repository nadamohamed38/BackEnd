const { Sequelize } = require("sequelize");

// Using SQLite for simplicity (can switch to MySQL/Postgres)
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite"
});

module.exports = sequelize;
