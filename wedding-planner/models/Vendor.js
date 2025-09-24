const {DataTypes} = require("sequelize");
const sequelize = require("../config/db")

const Vendor = sequelize.define("Vendor",{
    name:{type:DataTypes.STRING , allowNull : false},
    email:{type:DataTypes.STRING , unique:true},
    password:DataTypes.STRING,
    phone:DataTypes.STRING,
    category:{type:DataTypes.STRING , allowNull : false , defaultValue: "general"},
    rating: { type: DataTypes.FLOAT, defaultValue: 0 }
})

module.exports = Vendor