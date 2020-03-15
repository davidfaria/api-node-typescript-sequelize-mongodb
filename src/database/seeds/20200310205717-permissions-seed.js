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
      'permissions',
      [
        {
          slug: 'users_list',
          name: 'Listar usuários',
          description: 'Permite listar os usuários cadastrados',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          slug: 'users_create',
          name: 'Criar usuário',
          description: 'Permite criar novos usuários',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          slug: 'users_update',
          name: 'Atualizar usuário',
          description: 'Permite atualizar dados do usuario',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          slug: 'users_delete',
          name: 'Deletar usuário',
          description: 'Permite remover usuário',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          slug: 'categories_list',
          name: 'Listar categorias',
          description: 'Permite listar as categorias cadastradas',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          slug: 'categories_create',
          name: 'Criar usuário',
          description: 'Permite criar novas categorias',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          slug: 'categories_update',
          name: 'Atualizar usuário',
          description: 'Permite atualizar categorias',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          slug: 'categories_delete',
          name: 'Deletar usuário',
          description: 'Permite remover categoria',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          slug: 'products_list',
          name: 'Listar produtos',
          description: 'Permite listar os produtos',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          slug: 'products_create',
          name: 'Criar usuário',
          description: 'Permite criar produtos',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          slug: 'products_update',
          name: 'Atualizar usuário',
          description: 'Permite atualizar produtos',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          slug: 'products_delete',
          name: 'Deletar usuário',
          description: 'Permite remover produtos',
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
    return queryInterface.bulkDelete('permissions', null, {});
  },
};
