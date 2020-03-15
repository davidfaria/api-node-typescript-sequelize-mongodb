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
      'employees',
      [
        {
          store_id: 1 /** Store Larawork */,
          name: 'Zilda Diniz',
          badge: 'F001',
          genre: 'Feminino',
          birthdate: new Date(),
          email: '',
          type_document: 'PF',
          document: '',
          ie: '',
          rg: '',
          phone: '',
          cell_phone: '',
          zipcode: '',
          street: '',
          number: '',
          neighborhood: '',
          city: '',
          state: '',
          complement: '',
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
    return queryInterface.bulkDelete('employees', null, {});
  },
};
