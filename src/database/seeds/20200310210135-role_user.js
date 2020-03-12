'use strict';
module.exports = {
  /**
   * @function
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   */
  up: async (queryInterface, Sequelize) => {
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
      'user_roles',
      [
        {
          user_id: 1 /** Administrador */,
          role_id: 1 /** Administrador */,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1 /** Administrador */,
          role_id: 2 /** Gerente */,
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
    return queryInterface.bulkDelete('user_roles', null, {});
  },
};
