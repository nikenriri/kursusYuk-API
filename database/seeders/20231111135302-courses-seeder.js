'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Courses', [{
      name: 'React Javascript',
      description: 'Kursus React JS Seferhana',
      price: 10000000,
      category: 'Frontend',
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'React Native',
      description: 'Kursus React Native Seferhana',
      price: 15000000,
      category: 'Fullstack',
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courses', null, {});
  }
};
