const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Client = require("./Client");

const Event = sequelize.define("Event", {
  name: DataTypes.STRING,
  type: DataTypes.STRING,
  date: DataTypes.DATE,
  budget: DataTypes.FLOAT
});

Event.belongsTo(Client, { foreignKey: "client_id" , onDelete: "CASCADE"});
Client.hasMany(Event, { foreignKey: "client_id" , onDelete: "CASCADE"});

module.exports = Event;
