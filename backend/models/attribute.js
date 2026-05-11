module.exports = (sequelize, DataTypes) => {

  const Attribute = sequelize.define(
    "Attribute",

    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },

    {
       tableName: "attributes",
    }
  );



  Attribute.associate = (models) => {

    Attribute.hasMany(
      models.AttributeOption,
      {
        foreignKey: "attributeId",
      }
    );

  };



  return Attribute;
};