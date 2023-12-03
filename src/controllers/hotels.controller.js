const Joi = require('joi');
const hotelsService = require('../services/hotels.service');
const HTTP_STATUSES = require("./HTTP_STATUSES.json");

function validateHotel(hotel) {
  const schema = Joi.object({
    name: Joi.string().required(),
    lat: Joi.number().required(),
    lng: Joi.number().required()
  });
  return schema.validate(hotel);
}

async function createHotel(req, res) {
  const { error } = validateHotel(req.body);
  if (error) {
    return res.status(HTTP_STATUSES.BAD_REQUEST).send(error.details[0].message);
  }

  try {
    const hotel = await hotelsService.createHotel(req.body.name, req.body.lat, req.body.lng);
    res.status(HTTP_STATUSES.CREATED).json(hotel);
  } catch (error) {
    res.status(HTTP_STATUSES.SERVER_ERROR).send('Error creating hotel');
  }
}

async function getHotelById(req, res) {
  const { id } = req.params;

  try {
    const hotel = await hotelsService.getHotelById(id);
    if (!hotel) {
      return res.status(HTTP_STATUSES.NOT_FOUND).send('Hotel not found');
    }
    res.status(HTTP_STATUSES.OK).json({hotel});
  } catch (error) {
    res.status(HTTP_STATUSES.SERVER_ERROR).send('Error fetching hotel');
  }
}

async function deleteHotelById(req, res)  {
    const { id } = req.params;

    try {
        const hotel = await hotelsService.getHotelById(id);
        if (!hotel) {
          return res.status(HTTP_STATUSES.NOT_FOUND).send('Hotel not found');
        }
        await hotel.destroy();
        res.status(HTTP_STATUSES.NO_CONTENT).json({hotel});
    } catch (error) {
        res.status(HTTP_STATUSES.SERVER_ERROR).send('Error deleting hotel');
    }
}

async function updateHotelById(req, res)  {
    const { id } = req.params;
    
    const { error } = validateHotel(req.body);
    if (error) {
      return res.status(HTTP_STATUSES.BAD_REQUEST).send(error.details[0].message);
    }
    const { name, lat, lng } = req.body;
    try {
        const hotel = await hotelsService.getHotelById(id);
        if (!hotel) {
          return res.status(HTTP_STATUSES.NOT_FOUND).send('Hotel not found');
        }
        await hotel.update(id, { name, lat, lng });
        res.status(HTTP_STATUSES.CREATED).json({hotel});
    } catch (error) {
        res.status(HTTP_STATUSES.SERVER_ERROR).send('Error updating hotel');
    }
}



module.exports = {
  createHotel,
  getHotelById,
  deleteHotelById,
  updateHotelById
};
