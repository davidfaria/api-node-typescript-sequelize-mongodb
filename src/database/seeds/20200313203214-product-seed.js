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
      'products',
      [
        {
          store_id: 1 /** Store Larawork */,
          category_id: 1 /** Adulto Masculino */,
          name: 'Camisa polo branca M',
          reference: 'C001',
          amount: 10,
          price: 79.9,
          price_cost: 22.9,
          service: false,
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          store_id: 1 /** Store Larawork */,
          category_id: 2 /** Adulto Feminina */,
          name: 'Blusinha Básica M',
          reference: 'B001',
          amount: 40,
          price: 23.8,
          price_cost: 19.9,
          service: false,
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          store_id: 1 /** Store Larawork */,
          category_id: 6 /** Calçados */,
          name: 'Tênis nike preto 40',
          reference: 'T001',
          amount: 23,
          price: 60.5,
          price_cost: 39.9,
          service: false,
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
    return queryInterface.bulkDelete('products', null, {});
  },
};
