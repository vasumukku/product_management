const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");


app.use(cors());
app.use(express.json());

app.use("/api", categoryRoutes);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("API Running");
});

module.exports = app;