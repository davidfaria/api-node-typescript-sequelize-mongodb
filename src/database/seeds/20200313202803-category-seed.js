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
      'categories',
      [
        {
          store_id: 1 /** Store Larawork */,
          name: 'Adulto masculino',
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          store_id: 1 /** Store Larawork */,
          name: 'Adulto feminino',
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          store_id: 1 /** Store Larawork */,
          name: 'Infantil masculino',
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          store_id: 1 /** Store Larawork */,
          name: 'Infantil feminino',
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          store_id: 1 /** Store Larawork */,
          name: 'Bolsas',
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          store_id: 1 /** Store Larawork */,
          name: 'Calçados',
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
    return queryInterface.bulkDelete('categories', null, {});
  },
};
