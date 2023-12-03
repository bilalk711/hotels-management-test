const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database'); 

class Hotels extends Model { };
Hotels.init({
  name: DataTypes.STRING,
  lat: DataTypes.STRING,
  lng: DataTypes.STRING
}, { sequelize, modelName: 'hotels' });

module.exports = Hotels;