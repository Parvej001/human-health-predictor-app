const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post("/predict", async (req, res) => {
  try {
    const response = await axios.post("https://flask-model-service.onrender.com/predict", req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Model service failed" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
