'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Products', 'markdown_id', {
          type: Sequelize.DataTypes.INTEGER,
          name: 'fk_markdown_id_',
          references: { model: "Markdown", key: "id" },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        }, { transaction: t }),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Products', 'markdown_id', { transaction: t }),
      ]);
    });
  }
};