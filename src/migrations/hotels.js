'use strict';

module.exports = {
  up: async (queryInterface) => {

    // Sample data for Hotels
    await queryInterface.bulkInsert('Hotels', [
      {
        name: 'Hotel A',
        lat: '12.3456',
        lng: '98.7654'
      },
      {
        name: 'Hotel B',
        lat: '23.4567',
        lng: '87.6543'
      },
      // Add more sample data if needed
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Hotels');
  }
};
