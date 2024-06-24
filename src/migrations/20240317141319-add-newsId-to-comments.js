'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Comments', 'news_id', {
          type: Sequelize.DataTypes.INTEGER,
          name: 'fk_news_id_',
          allowNull: true,
          references: { model: "News", key: "id" },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        }, { transaction: t }),
        queryInterface.changeColumn('Comments', 'product_id', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Comments', 'news_id', { transaction: t }),
        queryInterface.changeColumn('Comments', 'product_id', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
        }, { transaction: t })
      ]);
    });
  }
};