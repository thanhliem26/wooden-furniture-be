'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Users', 'is_active', {
          type: Sequelize.DataTypes.ENUM('0', '1'),
          defaultValue: '1',
          allowNull: false,
        }, { transaction: t }),
        queryInterface.addColumn('Users', 'time_expired', {
          type: Sequelize.DataTypes.DATE,
        }, { transaction: t }),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'is_active', { transaction: t }),
        queryInterface.removeColumn('Users', 'time_expired', { transaction: t }),
      ]);
    });
  }
};