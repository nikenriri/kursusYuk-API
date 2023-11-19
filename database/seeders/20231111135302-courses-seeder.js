'use strict';
const courseConstant = require('../../app/constants/course')
const courseDetailConstant = require('../../app/constants/courseDetail')
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Courses', courseConstant);
    await queryInterface.bulkInsert('CourseDetails', courseDetailConstant);
  },
  
  

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courses', null, {});
    await queryInterface.bulkDelete('CourseDetails', null, {});

  }
};
