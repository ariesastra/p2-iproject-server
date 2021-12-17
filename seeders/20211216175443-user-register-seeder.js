'use strict';
const { hashPassword } = require('../helper/bcryipt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'tetangga1@mail.com',
        password: hashPassword('password'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'tetangga2@mail.com',
        password: hashPassword('password'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
