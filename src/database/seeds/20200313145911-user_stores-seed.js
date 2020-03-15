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
      'user_stores',
      [
        {
          user_id: 1 /** Administrador */,
          store_id: 1 /** Store larawork */,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1 /** Administrador */,
          store_id: 2 /** Store Garota Vip */,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2 /** Gerente */,
          store_id: 2 /** Store Garota Vip */,
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
    return queryInterface.bulkDelete('stores', null, {});
  },
};
