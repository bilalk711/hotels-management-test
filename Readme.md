# Hotels Management Microservice

A simple hotels management microservice for a test.

## How to start the app?

A `.env` file is provided with some initial values. The app uses a MySQL database. Add the values of the required variables(including the values for database prefixed with DB). There are some migrations inside the `/migrations` folder. If you want to prefil some data, run
the command `npm run migrate`. 
After setting up the database and adding the values for variables inside `.env` file, run the command `npm start` and the app will be served on port `8080`(by default).

## Project Structure
            ├───controllers
            ├───database
            ├───middlewares
            ├───migrations
            ├───models
            └───services

The project structure of the app is pretty straightword. There is a `HTTP_STATUSES.json` file inside controllers folder that ensures only valid HTTP responses are returned from controllers.

## Api Endpoints

Unauthentic user can only access `/signup` and `/login` endpoints. JWT Authentication is implemented by default. All other endpoints are only available for authenticated users.

**POST** `/signup` 

**POST** `/login`

(**Note**: Only authenticated users with token provided in headers are allowed. eg, Bearer {token})
**GET** `/hotels`           _Fetch a list of all hotels
_

**GET** `hotels/:id`        _Fetch a hotel by id_

**POST** `/hotels`          _Create a hotel_

**PUT** `/hotels/:id`    _Update a hotel_

**DELETE** `/hotels/:id`    _Delete a hotel_

**GET** `/rooms`            _Fetch a list of all rooms_

**GET** `/rooms/:hotelId`   _Fetch a list of all rooms of a hotel_

**GET** `rooms/:id`         _Fetch a room by id_

**POST** `/rooms`           _Create a room_

**PUT** `/rooms/:id`     _Update a room_

**DELETE** `/rooms/:id`     _Delete a room_

## Going forward

This project was implemented according to the requirements of a test assessment to showcase the abilities of the developer and lacks some improvements for the sack of brevity. In no case it will be completely functional for a real-life application.
