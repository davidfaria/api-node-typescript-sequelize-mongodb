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
    const [result, metadata] = await queryInterface.sequelize.query(
      'SELECT id FROM permissions',
    );
    // const [result, metadata] = await queryInterface.sequelize.query(
    //   'SELECT id FROM permissions',
    // );
    // console.log('PERMISSOES', result, metadata);

    const permissionsAdmin = result.map(current => {
      return {
        user_id: 1 /** Administrador */,
        permission_id: current.id,
        created_at: new Date(),
        updated_at: new Date(),
      };
    });

    const permissionsGerente = result.map(current => {
      return {
        user_id: 2 /** Gerente */,
        permission_id: current.id,
        created_at: new Date(),
        updated_at: new Date(),
      };
    });

    return queryInterface.bulkInsert(
      'user_permissions',
      [...permissionsAdmin, ...permissionsGerente],
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
    return queryInterface.bulkDelete('user_permissions', null, {});
  },
};
