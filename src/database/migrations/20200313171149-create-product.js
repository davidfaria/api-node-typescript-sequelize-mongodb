'use strict';

module.exports = {
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
        'products',
        {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
          store_id: {
            type: Sequelize.INTEGER,
            references: { model: 'stores', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            allowNull: false,
          },
          category_id: {
            type: Sequelize.INTEGER,
            references: { model: 'categories', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: true,
            defaultValue: null,
          },
          image_id: {
            type: Sequelize.INTEGER,
            references: { model: 'files', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: true,
            defaultValue: null,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          reference: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          amount: {
            type: Sequelize.INTEGER,
            allowNull: false,
            default: 0,
          },
          price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
            default: 0.0,
          },
          price_cost: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
            default: 0.0,
          },
          service: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            default: false,
          },
          status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            default: true,
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

      await transaction.commit();
    } catch (error) {
      console.log(error);
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
    return queryInterface.dropTable('products');
  },
};
