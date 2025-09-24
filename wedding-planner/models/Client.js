const {DataTypes} = require("sequelize");
const sequelize = require("../config/db");

const Client = sequelize.define("Client",{
    name:{type:DataTypes.STRING , allowNull:false},
    email:{type:DataTypes.STRING , unique:true},
    password:DataTypes.STRING,
    phone:DataTypes.STRING,
    points:{type:DataTypes.FLOAT , defaultValue:0}
})

module.exports = Client