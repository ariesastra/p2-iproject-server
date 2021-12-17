'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('PaymentStatuses', [
      {
        UserId: 2,
        OrganizationId: 1,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 1,
        OrganizationId: 2,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('PaymentStatuses', null, {});
  }
};
