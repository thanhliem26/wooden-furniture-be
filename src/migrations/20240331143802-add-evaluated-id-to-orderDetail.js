'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Order_detail', 'evaluate_id', {
          type: Sequelize.DataTypes.INTEGER,
          name: 'fk_evaluate_id',
          allowNull: true,
          references: { model: "Evaluates", key: "id" },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        }, { transaction: t }),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Order_detail', 'evaluate_id', { transaction: t }),
      ]);
    });
  }
};