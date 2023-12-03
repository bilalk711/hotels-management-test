const router = require("express").Router();
const authController = require("./controllers/auth.controller");
const hotelsController = require("./controllers/hotels.controller");
const roomsController = require("./controllers/rooms.controller");
const isAuthenticated = require("./middlewares");

router.get("/", (req, res) => res.json({message: "Hello World!"}));
router.post("/login", authController.login);
router.post("/signup", authController.signup);

router.post("/hotels", isAuthenticated, hotelsController.createHotel);
router.put("/hotels", isAuthenticated, hotelsController.updateHotelById);
router.delete("/hotels", isAuthenticated, hotelsController.deleteHotelById);
router.get("/hotels/:id", isAuthenticated, hotelsController.getHotelById);

router.post("/rooms", isAuthenticated, roomsController.createRoom);
router.put("/rooms", isAuthenticated, roomsController.updateRoomById);
router.delete("/rooms:id", isAuthenticated, roomsController.deleteRoomById);
router.get("/rooms/:hotelId", isAuthenticated, roomsController.getRoomsByHotelId);
router.get("/rooms/:id", isAuthenticated, roomsController.getRoomById);

module.exports = router;

