const {DataTypes} = require("sequelize");
const sequelize = require("../config/db");

const Admin = sequelize.define("Admin",{
    name:{type:DataTypes.STRING , allowNull:false},
    email:{type:DataTypes.STRING , unique:true},
    password:DataTypes.STRING,
    phone:DataTypes.STRING
})

module.exports = Admin