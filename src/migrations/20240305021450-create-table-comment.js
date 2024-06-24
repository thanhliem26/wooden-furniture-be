'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        name: 'fk_cm_product_id_',
        references: { model: "Products", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        name: 'fk_cm_user_id_',
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT,
        defaultValue: '',
      },
      left: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      right: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      parent_id: {
        type: Sequelize.INTEGER
      },
      is_deleted: {
        type: Sequelize.ENUM('0', '1'),
        defaultValue: '0',
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
    await queryInterface.dropTable('Comments');
  }
};
