const Joi = require('joi');
const roomsService = require('../services/rooms.service'); 
const HTTP_STATUSES = require("./HTTP_STATUSES.json");

function validateRoom(room) {
  const schema = Joi.object({
    roomNumber: Joi.number().integer().required(),
    hotelId: Joi.number().integer().required(),
    wifi: Joi.boolean().required(),
    breakfast: Joi.boolean().required(),
    price: Joi.number().required()
  });
  return schema.validate(room);
}

async function createRoom(req, res) {
  const { error } = validateRoom(req.body);
  if (error) {
    return res.status(HTTP_STATUSES.BAD_REQUEST).send(error.details[0].message);
  }

  try {
    const roomData = { roomNumber: req.body.roomNumber, 
                        hotelId: req.body.hotelId, 
                        wifi: req.body.wifi, 
                        breakfast: req.body.breakfast, 
                        price: req.body.price }
    const room = await roomsService.createRoom(roomData);
    res.status(HTTP_STATUSES.CREATED).json(room);
  } catch (error) {
    res.status(HTTP_STATUSES.SERVER_ERROR).send('Error creating room');
  }
}

async function getRoomsByHotelId(req, res) {
  const { hotelId } = req.params;

  try {
    const rooms = await roomsService.getRoomsByHotelId(hotelId);
    res.status(HTTP_STATUSES.OK).json(rooms);
  } catch (error) {
    res.status(HTTP_STATUSES.SERVER_ERROR).send('Error fetching rooms');
  }
}

async function getRoomById(req, res) {
    const { hotelId } = req.params;
  
    try {
      const room = await roomsService.getRoomById(hotelId);
      if (!room) {
        return res.status(HTTP_STATUSES.NOT_FOUND).send('Room not found');
      }
      res.status(HTTP_STATUSES.OK).json(room);
    } catch (error) {
      res.status(HTTP_STATUSES.SERVER_ERROR).send('Error fetching room');
    }
  }

async function deleteRoomById(req, res){
    const id = req.params.id;

    try {
        const  room = await roomsService.getRoomById(id);
        if (!room) {
            return res.status(HTTP_STATUSES.NOT_FOUND).send('Room not found');
        }
        await room.destroy();
        res.status(HTTP_STATUSES.NO_CONTENT).json({room});
    } catch (error) {
        res.status(HTTP_STATUSES.SERVER_ERROR).send('Error deleting room');
      }
}

async function updateRoomById(req, res)  {
    const { id } = req.params;
    
    const { error } = validateRoom(req.body);
    if (error) {
      return res.status(HTTP_STATUSES.BAD_REQUEST).send(error.details[0].message);
    }
  
    try {
      const room = await roomsService.getRoomById(id);
      if (!room) {
        return res.status(HTTP_STATUSES.NOT_FOUND).send('Room not found');
      }
      const roomData = { roomNumber: req.body.roomNumber, 
        hotelId: req.body.hotelId, 
        wifi: req.body.wifi, 
        breakfast: req.body.breakfast, 
        price: req.body.price }
      await roomsService.update(roomData);
      res.status(HTTP_STATUSES.CREATED).json(room);
    } catch (error) {
      res.status(HTTP_STATUSES.SERVER_ERROR).send('Error creating room');
    }
}

module.exports = {
  createRoom,
  getRoomsByHotelId,
  getRoomById,
  deleteRoomById,
  updateRoomById
};
