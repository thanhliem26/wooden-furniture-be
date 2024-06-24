"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          "Markdown",
          "contentMarkdown",
          {
            allowNull: true,
            type: Sequelize.TEXT('long'),
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          "Markdown",
          "contentHTML",
          {
            allowNull: true,
            type: Sequelize.TEXT('long'),
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
          "Markdown",
          "contentMarkdown",
          {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          "Markdown",
          "contentHTML",
          {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          { transaction: t }
        ),
      ]);
    });
  },
};
