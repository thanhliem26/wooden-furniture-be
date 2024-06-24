"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("Orders", "order_date", { transaction: t }),
        queryInterface.removeColumn("Orders", "total_amount", {
          transaction: t,
        }),
        queryInterface.changeColumn(
          "Orders",
          "order_status",
          {
            type: Sequelize.DataTypes.ENUM(
              "pending",
              "wait_confirmation",
              "confirmed",
              "shipped",
              "cancelled",
              "delivered"
            ),
            defaultValue: "pending",
            after: "user_id",
          },
          { transaction: t }
        ),
        queryInterface.changeColumn("Orders", "user_id", {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          name: 'fk_orderDetail_id_orders',
          references: { model: "Users", key: "id" },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          transaction: t,
        }),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "Orders",
          "order_date",
          {
            type: Sequelize.DataTypes.DATE,
            after: "user_id",
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "Orders",
          "total_amount",
          {
            type: Sequelize.DataTypes.INTEGER,
            after: "user_id",
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          "Orders",
          "order_status",
          {
            type: Sequelize.DataTypes.ENUM(
              "pending",
              "confirmed",
              "shipped",
              "cancelled",
              "delivered"
            ),
            defaultValue: "pending",
            after: "user_id",
          },
          { transaction: t }
        ),
        queryInterface.changeColumn("Orders", "user_id", {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          transaction: t,
        }),
      ]);
    });
  },
};
