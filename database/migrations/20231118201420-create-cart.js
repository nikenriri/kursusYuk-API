'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Users', key: 'id'}
        }
      },
      course_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Courses', key: 'id'}
        }
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      price_total: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    await queryInterface.dropTable('Carts');
  }
};