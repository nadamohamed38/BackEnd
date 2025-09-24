const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Venue = sequelize.define("Venue", {
  name: { type: DataTypes.STRING, allowNull: false },
  location: DataTypes.STRING,
  capacity: DataTypes.INTEGER,
  price_range: DataTypes.FLOAT
});


module.exports = Venue;
