'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserContact', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING(25)
      },
      address: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      is_read: {
        type: Sequelize.ENUM('0', '1'),
        defaultValue: '0',
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        name: 'fk_user_id',
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
    await queryInterface.dropTable('UserContact');
  }
};
