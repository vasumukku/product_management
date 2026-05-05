const express = require("express");
const router = express.Router();

const product = require("../controllers/productController");

router.post("/create",product.createProduct);
router.get("/all",product.getAllProducts);

module.exports = router;