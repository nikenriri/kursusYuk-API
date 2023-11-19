'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      checkout_id: {
        type: Sequelize.INTEGER,
        references:{
          model: {tableName: 'Checkouts', key: 'id'}
        }
      },
      courseDetail_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {tableName: 'CourseDetails', key: 'id'}
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};