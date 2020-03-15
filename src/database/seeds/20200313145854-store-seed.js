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
      'stores',
      [
        {
          name: 'Larawork',
          type_document: 'PJ',
          document: '96.122.798/0001-13',
          ie: '',
          phone: '(31) 3446-4646',
          cell_phone: '(31) 98869-7106',
          email: 'admin@larawork.com.br',
          zipcode: '35162292',
          street: 'Rua Papoula',
          number: '108',
          neighborhood: 'Bom Jardim',
          city: 'Ipatinga',
          state: 'MG',
          status: true,
          complement: 'Sala 103',
          note: 'Studio e Software house',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'GarotaVip',
          type_document: 'PJ',
          document: '10.204.761/0001-19',
          ie: '',
          phone: '(31) 3543-5452',
          cell_phone: '(31) 98808-0704',
          email: 'contatogatorvip@gmail.com',
          zipcode: '35160-002',
          street: 'Av. João Valentim Pascoal',
          number: '712',
          neighborhood: 'Centro',
          city: 'Ipatinga',
          state: 'MG',
          status: true,
          complement: 'Ao Lado do correios',
          note: 'Loja de roupas',
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
