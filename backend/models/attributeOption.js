module.exports = (sequelize, DataTypes) => {

  const AttributeOption = sequelize.define(
    "AttributeOption",

    {
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },

    {
     tableName: "attributeoptions",
    }
  );



  AttributeOption.associate = (models) => {

    AttributeOption.belongsTo(
      models.Attribute,
      {
        foreignKey: "attributeId",
      }
    );

  };



  return AttributeOption;
};