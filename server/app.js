const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Node.js backend is live!");
});

app.post("/predict", async (req, res) => {
  try {
    console.log("📥 Received prediction request:", req.body);

    const response = await axios.post("https://flask-model-service.onrender.com/predict", req.body);

    console.log("📤 Response from Flask model:", response.data);

    res.json(response.data);
  } catch (err) {
    console.error("❌ Error in calling Flask model:", err.response?.data || err.message);
    res.status(500).json({ error: "Model service failed" });
  }
});

// ✅ Add this route to support symptoms fetching
app.get("/symptoms", async (req, res) => {
  try {
    const response = await axios.get("https://flask-model-service.onrender.com/symptoms");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching symptoms:", error.message);
    res.status(500).json({ error: "Failed to fetch symptoms" });
  }
});

app.listen(PORT, () => console.log(`✅ Node.js server running on port ${PORT}`));
