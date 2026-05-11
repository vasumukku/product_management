const router = require("express").Router();

const attribute =
  require("../controllers/attributeController");




router.post(
  "/create",
  attribute.createAttribute
);




router.get(
  "/",
  attribute.getAttributes
);



module.exports = router;