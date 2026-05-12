const router = require("express").Router();

const attribute =
  require("../controllers/attributeController");


// CREATE ATTRIBUTE
router.post(
  "/create",
  attribute.createAttribute
);


// GET ALL ATTRIBUTES
router.get(
  "/",
  attribute.getAttributes
);


// GET SINGLE ATTRIBUTE
router.get(
  "/:id",
  attribute.getSingleAttribute
);


// UPDATE ATTRIBUTE
router.put(
  "/:id",
  attribute.updateAttribute
);


// DELETE ATTRIBUTE
router.delete(
  "/:id",
  attribute.deleteAttribute
);


module.exports = router;