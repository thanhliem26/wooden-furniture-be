'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Orders', 'name', {
          type: Sequelize.DataTypes.STRING,
          defaultValue: '',
        }, { transaction: t }),
        queryInterface.addColumn('Orders', 'phone_number', {
          type: Sequelize.DataTypes.STRING,
          defaultValue: '',
        }, { transaction: t }),
        queryInterface.addColumn('Orders', 'email', {
          type: Sequelize.DataTypes.STRING,
          defaultValue: '',
        }, { transaction: t }),
        queryInterface.addColumn('Orders', 'address', {
          type: Sequelize.DataTypes.STRING,
          defaultValue: '',
        }, { transaction: t }),
        queryInterface.addColumn('Orders', 'note', {
          type: Sequelize.DataTypes.TEXT,
          defaultValue: '',
        }, { transaction: t }),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Orders', 'name', { transaction: t }),
        queryInterface.removeColumn('Orders', 'phone_number', { transaction: t }),
        queryInterface.removeColumn('Orders', 'email', { transaction: t }),
        queryInterface.removeColumn('Orders', 'address', { transaction: t }),
        queryInterface.removeColumn('Orders', 'note', { transaction: t }),
      ]);
    });
  }
};