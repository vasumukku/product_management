const express = require("express");
const router = express.Router();

const variant = require("../controllers/variantController");

router.post("/create",variant.createVariant);
router.get("/:id",variant.getVariantsByProduct);


module.exports = router;