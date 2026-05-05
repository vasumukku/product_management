const db = require("../models");
const Variant = db.Variant;


exports.createVariant = async (req, res) => {
  try {
    const { sku, price, discount, quantity, productId, attributes } = req.body;

    const variant = await Variant.create({
      sku,
      price,
      discount,
      quantity,
      productId,
      attributes,
    });

    res.status(201).json(variant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getVariantsByProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const variants = await Variant.findAll({
      where: { productId },
    });

    res.status(200).json(variants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};