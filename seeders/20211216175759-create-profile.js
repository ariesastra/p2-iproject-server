'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Profiles', [
      {
        UserId: 1,
        namaLengkap: 'Arie Sastra',
        alamat: 'Jl. Watubela 2 No. RF-3A',
        kecamatan: 'Rawa Mekar Jaya',
        kelurahan: 'Serpong',
        kotaKab: 'Tangerang Selatan',
        provinsi: 'Banten',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 2,
        namaLengkap: 'Tia Kharisma',
        alamat: 'Jl. Watubela 2 No. RF-3A',
        kecamatan: 'Rawa Mekar Jaya',
        kelurahan: 'Serpong',
        kotaKab: 'Tangerang Selatan',
        provinsi: 'Banten',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Profiles', null, {});
  }
};
