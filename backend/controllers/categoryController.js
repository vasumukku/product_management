const db = require("../models");
const Category = db.Category;


exports.createCategory = async (req, res) => {
  try {
    const { name, active } = req.body;

    const category = await Category.create({
      name,
      active,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, active } = req.body;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.update({
      name,
      active,
    });

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.destroy();

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};