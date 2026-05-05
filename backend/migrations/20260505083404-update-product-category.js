"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Products", "category");

    await queryInterface.addColumn("Products", "categoryId", {
      type: Sequelize.INTEGER,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Products", "categoryId");

    await queryInterface.addColumn("Products", "category", {
      type: Sequelize.STRING,
    });
  },
};