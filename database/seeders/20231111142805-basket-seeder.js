'use strict';
const { faker } = require('@faker-js/faker')


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const basketsData = [];
    
    
    for (let i = 0; i < 10; i++) {
      basketsData.push({
        user_id: faker.number.int(),
        product_id: faker.commerce.isbn(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Baskets', basketsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Baskets', null, {});
  }
};
