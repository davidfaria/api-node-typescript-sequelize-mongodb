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
      'customers',
      [
        {
          store_id: 1 /** Store Larawork */,
          name: 'David Faria',
          genre: 'Masculino',
          birthdate: new Date(),
          email: 'davidfaria89@gmail.com',
          type_document: 'PF',
          document: '112.846.760-72',
          ie: '',
          rg: '87.888.333-98',
          phone: '(31) 3446-4646',
          cell_phone: '(31) 98869-7106',
          zipcode: '35162293',
          street: 'Rua Rosa Branca',
          number: '229',
          neighborhood: 'Bom Jardim',
          city: 'Ipatinga',
          state: 'MG',
          complement: 'Apt 02',
          note: '',
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          store_id: 1 /** Store Larawork */,
          name: 'Davi Matos',
          genre: 'Masculino',
          birthdate: new Date(),
          email: 'davimatos@gmail.com',
          type_document: 'PF',
          document: '112.222.760-72',
          ie: '',
          rg: '76.668.444-10',
          phone: '(31) 3446-4646',
          cell_phone: '(31) 98869-7106',
          zipcode: '35162293',
          street: 'Rua Rosa Branca',
          number: '229',
          neighborhood: 'Bom Jardim',
          city: 'Ipatinga',
          state: 'MG',
          complement: 'Apt 02',
          note: '',
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          store_id: 1 /** Store Larawork */,
          name: 'Loja Vip Store',
          genre: 'Masculino',
          birthdate: new Date(),
          email: 'vipstore@gmail.com',
          type_document: 'PJ',
          document: '11.222.760/0001-72',
          ie: '',
          rg: '',
          phone: '(31) 3446-5452',
          cell_phone: '(31) 97766-7106',
          zipcode: '35160-002',
          street: 'Av. João Valentim Pascoal',
          number: '712',
          neighborhood: 'Centro',
          city: 'Ipatinga',
          state: 'MG',
          complement: 'Apt 02',
          note: '',
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
    return queryInterface.bulkDelete('customers', null, {});
  },
};
