'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('Users', 'role_user', {
          type: Sequelize.DataTypes.ENUM('1', '2', '3'),
          defaultValue: '2',
        }, { transaction: t }),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('Users', 'role_user', {
          type: Sequelize.DataTypes.ENUM('1', '2', '3'),
          defaultValue: '3',
        }, { transaction: t }),
      ]);
    });
  }
};