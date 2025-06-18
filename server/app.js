const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;
const MODEL_URL = process.env.MODEL_URL || "https://flask-model-service.onrender.com"; // fallback for local dev

app.use(cors());
app.use(express.json());

app.post("/predict", async (req, res) => {
  try {
    const response = await axios.post(`${MODEL_URL}/predict`, req.body);
    res.json(response.data);
  } catch (err) {
    console.error("❌ Error connecting to model:", err.message);
    res.status(500).json({ error: "Model service failed" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Node.js server running on port ${PORT}`);
});
