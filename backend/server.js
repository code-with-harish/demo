const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const dietRoutes = require("./routes/diet");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/diet", dietRoutes);

// Health check endpoint for deployment
app.get("/", (req, res) => {
  res.json({ message: "Ayur Diet Backend is running!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
