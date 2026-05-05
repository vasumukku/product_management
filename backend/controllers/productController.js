const db = require("../models");
const Product = db.Product;


exports.createProduct = async (req, res) => {
  try {
    const { title, description, categoryId } = req.body;

    const product = await Product.create({
      title,
      description,
      categoryId,
      active: true,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: "variants",
    });

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

