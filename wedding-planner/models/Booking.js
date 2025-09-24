const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Event = require("./Event");
const Vendor = require("./Vendor");
const Venue = require("./Venue");

const Booking = sequelize.define("Booking", {
  status: { type: DataTypes.STRING, defaultValue: "pending" }
});

Booking.belongsTo(Event, { foreignKey: "event_id" , onDelete: "CASCADE"});
Booking.belongsTo(Vendor, { foreignKey: "vendor_id" , onDelete: "CASCADE"});
Booking.belongsTo(Venue, { foreignKey: "venue_id" , onDelete: "CASCADE"});

module.exports = Booking;
