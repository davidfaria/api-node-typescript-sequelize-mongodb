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
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
      */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'permission_role',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
          },
          permission_id: {
            type: Sequelize.DataTypes.UUID,
            references: { model: 'permissions', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            allowNull: false,
          },
          role_id: {
            type: Sequelize.DataTypes.UUID,
            references: { model: 'roles', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            allowNull: false,
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        },
        { transaction },
      );

      await queryInterface.addIndex(
        'permission_role',
        ['permission_id', 'role_id'],
        { transaction, unique: true },
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
      */

    return queryInterface.dropTable('permission_role');
  },
};
