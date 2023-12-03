'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Rooms', [
      {
        roomNumber: 101,
        wifi: true,
        breakfast: true,
        price: 150.0,
        hotelId: 1 // Link this room to Hotel A
      },
      {
        roomNumber: 201,
        wifi: false,
        breakfast: false,
        price: 100.0,
        hotelId: 2 // Link this room to Hotel B
      },
      // Add more sample data if needed
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Rooms');
  }
};
