const Rooms = require('../models/Rooms.js'); 

    async function createRoom(data) {
        try {
            const room = await Rooms.create({ ...data });
            return room;
        } catch (error) {
            throw new Error('Error creating room');
        }
    }

    async function getRoomsByHotelId(hotelId) {
        try {
            const rooms = await Rooms.findAll({ where: { hotelId } });
            return rooms;
        } catch (error) {
            throw new Error('Error fetching rooms');
        }
    }

    async function getRoomById(id) {
        try {
            const room = await Rooms.findByPk(id);
            return room;
        } catch (error) {
            throw new Error('Error fetching room');
        }
    }

  module.exports = {
    createRoom,
    getRoomsByHotelId,
    getRoomById
  }