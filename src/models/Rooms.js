const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database'); 
const Hotels = require("./Hotels");

class Rooms extends Model {};
Rooms.init({
    roomNumber: DataTypes.INTEGER,
    wifi: DataTypes.BOOLEAN,
    breakfast: DataTypes.BOOLEAN,
    price: DataTypes.FLOAT
}, { sequelize, modelName: "rooms"});

Rooms.belongsTo(Hotels, {
  as: 'rooms',
  foreignKey: 'hotelId'
});

module.exports = Rooms;