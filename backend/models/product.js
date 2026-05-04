module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,   
    },
    description: {
      type: DataTypes.TEXT,
    },
    brand: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, 
    },
  });

  return Product;
};