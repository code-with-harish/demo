const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const dietRoutes = require("../routes/diet");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/diet", dietRoutes);

// Health check
app.get("/api", (req, res) => {
  res.json({ message: "Ayur Diet API is running!" });
});

module.exports = app;