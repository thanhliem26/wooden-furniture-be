'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Users', 'provider', {
          type: Sequelize.DataTypes.ENUM('local', 'facebook', 'google'),
          defaultValue: 'local',
          allowNull: false,
        }, { transaction: t }),
        queryInterface.addColumn('Users', 'uid', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'provider', { transaction: t }),
        queryInterface.removeColumn('Users', 'uid', { transaction: t }),
      ]);
    });
  }
};