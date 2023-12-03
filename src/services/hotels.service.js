const Hotels = require('../models/Hotels'); 

async function createHotel(name, lat, lng) {
  try {
    const hotel = await Hotels.create({ name, lat, lng });
    return hotel;
  } catch (error) {
    throw new Error('Error creating hotel');
  }
}

async function getHotelById(id) {
  try {
    const hotel = await Hotels.findByPk(id);
    return hotel;
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching hotel');
  }
}

module.exports = {
  createHotel,
  getHotelById
};
