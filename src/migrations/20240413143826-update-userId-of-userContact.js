"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          "UserContact",
          "user_id",
          {
            allowNull: true,
            type: Sequelize.INTEGER,
          },
          { transaction: t }
        ),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          "UserContact",
          "user_id",
          {
            allowNull: false,
            type: Sequelize.INTEGER,
            name: "fk_user_id",
            references: { model: "Users", key: "id" },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          { transaction: t }
        ),
      ]);
    });
  },
};
