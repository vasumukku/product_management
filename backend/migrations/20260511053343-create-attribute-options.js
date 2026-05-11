"use strict";

module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable(
      "attributeoptions",
      {

        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },



        attributeId: {
          type: Sequelize.INTEGER,

          references: {
            model: "attributes",
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
      "attributeoptions"
    );

  },

};