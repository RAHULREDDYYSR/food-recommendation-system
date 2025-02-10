import express from 'express'
import axios from 'axios'
const app = express()
app.get("/", async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ error: "Latitude and Longitude are required" });
    }

    const apiKey = process.env.OPENWEATHERMAP_API_KEY; // Use environment variable for security
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );

    res.json(weatherResponse.data);
  } catch (error) {
    console.error("Weather API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

export default app;
