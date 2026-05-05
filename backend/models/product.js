module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    brand: DataTypes.STRING,

   
    categoryId: {
      type: DataTypes.INTEGER,
    },

    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  Product.associate = (models) => {
  
    Product.hasMany(models.Variant, {
      foreignKey: "productId",
      as: "variants",
    });

   
    Product.belongsTo(models.Category, {
      foreignKey: "categoryId",
      as: "category",
    });
  };

  return Product;
};