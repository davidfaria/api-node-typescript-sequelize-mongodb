'use strict';
import { v4 as uuid } from 'uuid';

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
      'roles',
      [
        {
          id: uuid(),
          slug: 'administrador',
          name: 'administrador',
          description: 'Administrador',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuid(),
          slug: 'gerente',
          name: 'gerente',
          description: 'Gerente',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuid(),
          slug: 'supervisor',
          name: 'supervisor',
          description: 'Supervisor',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuid(),
          slug: 'estoque',
          name: 'estoque',
          description: 'Estoque',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuid(),
          slug: 'caixa',
          name: 'caixa',
          description: 'Caixa',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuid(),
          slug: 'vendedor',
          name: 'vendedor',
          description: 'Vendedor',
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
    return queryInterface.bulkDelete('roles', null, {});
  },
};
