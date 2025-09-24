const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Client = require("./Client");
const Vendor = require("./Vendor");
const Venue = require("./Venue");

const Review = sequelize.define("Review", {
  rating: { type: DataTypes.INTEGER, allowNull: false },
  comment: DataTypes.TEXT,
  imageUrl: {type: DataTypes.STRING,allowNull: true}
});

Review.belongsTo(Client, { foreignKey: "client_id", onDelete: "CASCADE" });
Review.belongsTo(Vendor, { foreignKey: "vendor_id", onDelete: "CASCADE" });
Review.belongsTo(Venue, { foreignKey: "venue_id", onDelete: "CASCADE" });

Client.hasMany(Review, { foreignKey: "client_id", onDelete: "CASCADE" });
Vendor.hasMany(Review, { foreignKey: "vendor_id", onDelete: "CASCADE" });
Venue.hasMany(Review, { foreignKey: "venue_id", onDelete: "CASCADE" });

module.exports = Review;
