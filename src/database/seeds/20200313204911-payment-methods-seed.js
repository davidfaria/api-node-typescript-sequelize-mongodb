'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
      */
    return queryInterface.bulkInsert(
      'payment_methods',
      [
        {
          name: 'Dinheiro',
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Débito',
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Crédito',
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Cheque',
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Promissória',
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Mov. Bancária',
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
      */
    return queryInterface.bulkDelete('payment_methods', null, {});
  },
};
