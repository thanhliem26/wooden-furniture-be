"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("Order_detail", "product_list_id", {
          transaction: t,
        }),
        queryInterface.removeColumn("Order_detail", "unit_list_price", {
          transaction: t,
        }),
        queryInterface.addColumn("Order_detail", "productId", {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          name: 'fk_orderDetail_id_products',
          references: { model: "Products", key: "id" },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          after: 'order_id',
          transaction: t,
        }),
        queryInterface.changeColumn("Order_detail", "order_id", {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          name: 'fk_orderDetail_id_orders',
          references: { model: "Orders", key: "id" },
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
        queryInterface.addColumn("Order_detail", "product_list_id", {
          type: Sequelize.DataTypes.STRING,
          transaction: t,
        }),
        queryInterface.addColumn("Order_detail", "unit_list_price", {
          type: Sequelize.DataTypes.STRING,
          transaction: t,
        }),
        queryInterface.removeColumn("Order_detail", "productId", {
          transaction: t,
        }),
        queryInterface.changeColumn("Order_detail", "order_id", {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          transaction: t,
        }),
      ]);
    });
  },
};
