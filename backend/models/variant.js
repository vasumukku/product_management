module.exports = (sequelize, DataTypes) => {
  const Variant = sequelize.define("Variant", {
    sku: DataTypes.STRING,
    price: DataTypes.FLOAT,
    discount: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    attributes: DataTypes.JSON,
    productId: DataTypes.INTEGER,
  });

  Variant.associate = (models) => {
    Variant.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });
  };

  return Variant;
};