# Hotels Management Microservice

A simple hotels management microservice for a test.

## How to start the app?

A `.env` file is provided with some initial values. The app uses a MySQL database. Add the values of the required variables(including the values for database prefixed with DB). There are some migrations inside the `/migrations` folder. If you want to prefil some data, run
the command `npm run migrate`. 
After setting up the database and adding the values for variables inside `.env` file, run the command `npm start` and the app will be served on port `8080`(by default).

## Project Structure

Hotels-management-api
                    └───src
                        ├───controllers             # Route Controllers
                        ├───database                # Database configuration
                        ├───middlewares             # Middleware functions
                        ├───migrations              # Migrations to prefil some data
                        ├───models                  # Sequelize Models
                        └───services                # Business logic functions

The project structure of the app is pretty straightword. There is a `HTTP_STATUSES.json` file inside controllers folder that ensures only valid HTTP responses are returned from controllers.

## Api Endpoints

Unauthentic user can only access `/signup` and `/login` endpoints. JWT Authentication is implemented by default. All other endpoints are only available for authenticated users.

POST `/signup` 
POST `/login`

(Note: Only authenticated users with token provided in headers are allowed. eg, Bearer {token})
GET `/hotels`           # Fetch a list of all hotels
GET `hotels/:id`        # Fetch a hotel by id
POST `/hotels`          # Create a hotel
UPDATE `/hotels/:id`    # Update a hotel
DELETE `/hotels/:id`    # Delete a hotel
GET `/rooms`            # Fetch a list of all rooms
GET `/rooms/:hotelId`   # Fetch a list of all rooms of a hotel
GET `rooms/:id`         # Fetch a room by id
POST `/rooms`           # Create a room
UPDATE `/rooms/:id`     # Update a room
DELETE `/rooms/:id`     # Delete a room

## Going forward

This project was implemented according to the requirements of a test assessment to showcase the abilities of the developer and lacks some improvements for the sack of brevity. In no case it will be completely functional for a real-life application.