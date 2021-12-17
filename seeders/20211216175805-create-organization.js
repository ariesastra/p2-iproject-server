'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Organizations', [
      {
        name: 'Iuran Pembangunan Masjid Komplek Nusa Loka',
        description: 'pembanugnan masjid tahap 2 sudah dimulai, ayo mari kita bantu pembangunan',
        isPaid: true,
        price: 900_000_00,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Iuran Bulanan Keamanan',
        description: 'Iuaran Keamanan Bulanan komplek Nusa Loka',
        isPaid: true,
        price: 90_000_00,
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Organizations', null, {});
  }
};
