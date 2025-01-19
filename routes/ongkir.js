const express = require("express");
const axios = require("axios");
const router = express.Router();

const API_KEY =
  "95911cd69620a036ba85459506b62ebac2e06edbb6de877768e6b810ef940253";

router.post("/", async (req, res) => {
  const { origin, destination, weight, courier, volume } = req.body;
  try {
    const response = await axios.get(
      `https://api.binderbyte.com/v1/cost?api_key=${API_KEY}&origin=${origin}&destination=${destination}&weight=${weight}&courier=${courier}&volume=${volume}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching ongkir data" });
  }
});

module.exports = router;
