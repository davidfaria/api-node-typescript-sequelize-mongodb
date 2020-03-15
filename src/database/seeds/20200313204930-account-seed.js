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
      'accounts',
      [
        {
          store_id: 1 /** Larawork */,
          name: 'Caixa',
          status: true,
          default: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          store_id: 2 /** Garotavip */,
          name: 'Caixa',
          status: true,
          default: true,
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
  },
};
