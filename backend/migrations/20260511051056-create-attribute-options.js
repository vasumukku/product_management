"use strict";

module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable(
      "AttributeOptions",
      {

        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },

        attributeId: {
          type: Sequelize.INTEGER,

          references: {
            model: "Attributes",
            key: "id",
          },

          onDelete: "CASCADE",
        },

        value: {
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
      "AttributeOptions"
    );

  },
};