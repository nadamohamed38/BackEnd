// models/CommunityPost.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Vendor = require("./Vendor");

const CommunityPost = sequelize.define("CommunityPost", {
  title: {type: DataTypes.STRING,allowNull: false},
  description: {type: DataTypes.TEXT,allowNull: false},
  imageUrl: {type: DataTypes.STRING,allowNull: true}
});

CommunityPost.belongsTo(Vendor, { foreignKey: "vendor_id", onDelete: "CASCADE" });
Vendor.hasMany(CommunityPost, { foreignKey: "vendor_id", onDelete: "CASCADE" });


module.exports = CommunityPost;
