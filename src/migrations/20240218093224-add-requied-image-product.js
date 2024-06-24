'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('Products', 'images', {
          type: Sequelize.DataTypes.TEXT,
          allowNull: false,
          defaultValue: '[]',
        }, { transaction: t }),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('Products', 'images', {
          type: Sequelize.DataTypes.TEXT,
          allowNull: true,
        }, { transaction: t }),
      ]);
    });
  }
};
