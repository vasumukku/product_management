const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes= require("./routes/productRoutes");
const variantRoutes = require("./routes/variantRoutes");



app.use(cors());
app.use(express.json());

app.use("/api", categoryRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/products",productRoutes );
app.use("/api/variants", variantRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

module.exports = app;