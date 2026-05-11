"use strict";

module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable(
      "Attributes",
      {

        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },

        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },

        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },

      }
    );

  },

  async down(queryInterface) {

    await queryInterface.dropTable(
      "Attributes"
    );

  },
};