const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET /api/weather/forecast - Get weather forecast
router.get('/forecast', async (req, res) => {
  try {
    const city = req.query.city || 'Pune';
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ 
        error: 'OpenWeather API key not configured',
        message: 'Please add OPENWEATHER_API_KEY to .env file'
      });
    }

    // Get current weather
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const currentResponse = await axios.get(currentWeatherUrl);
    const currentData = currentResponse.data;

    // Get 5-day forecast
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const forecastResponse = await axios.get(forecastUrl);
    const forecastData = forecastResponse.data;

    // Process current weather
    const current = {
      temperature: Math.round(currentData.main.temp),
      humidity: currentData.main.humidity,
      description: currentData.weather[0].description,
      wind_speed: currentData.wind.speed,
      rain_probability: currentData.rain ? 100 : 0
    };

    // Process 5-day forecast (get one forecast per day at noon)
    const dailyForecasts = [];
    const seenDates = new Set();

    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateStr = date.toDateString();
      
      // Get forecast around noon (12:00) for each day
      if (!seenDates.has(dateStr) && date.getHours() >= 11 && date.getHours() <= 13) {
        seenDates.add(dateStr);
        dailyForecasts.push({
          day: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
          temp_max: Math.round(item.main.temp_max),
          temp_min: Math.round(item.main.temp_min),
          humidity: item.main.humidity,
          description: item.weather[0].description,
          rain_probability: item.pop ? Math.round(item.pop * 100) : 0
        });
      }
    });

    // If we don't have enough forecasts, fill with available data
    if (dailyForecasts.length < 5) {
      const grouped = {};
      forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateStr = date.toDateString();
        
        if (!grouped[dateStr]) {
          grouped[dateStr] = [];
        }
        grouped[dateStr].push(item);
      });

      dailyForecasts.length = 0;
      Object.keys(grouped).slice(0, 5).forEach(dateStr => {
        const items = grouped[dateStr];
        const avgItem = items[Math.floor(items.length / 2)];
        const date = new Date(avgItem.dt * 1000);
        
        dailyForecasts.push({
          day: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
          temp_max: Math.round(Math.max(...items.map(i => i.main.temp_max))),
          temp_min: Math.round(Math.min(...items.map(i => i.main.temp_min))),
          humidity: Math.round(items.reduce((sum, i) => sum + i.main.humidity, 0) / items.length),
          description: avgItem.weather[0].description,
          rain_probability: Math.round((items.reduce((sum, i) => sum + (i.pop || 0), 0) / items.length) * 100)
        });
      });
    }

    res.json({
      city: city,
      current: current,
      forecast: dailyForecasts.slice(0, 5)
    });

  } catch (error) {
    console.error('Weather forecast error:', error.message);
    
    if (error.response?.status === 401) {
      return res.status(401).json({ 
        error: 'Invalid OpenWeather API key',
        message: 'Please check your OPENWEATHER_API_KEY in .env file'
      });
    }

    if (error.response?.status === 404) {
      return res.status(404).json({ 
        error: 'City not found',
        message: 'Please check the city name and try again'
      });
    }

    res.status(500).json({ 
      error: 'Failed to fetch weather data',
      message: error.message
    });
  }
});

module.exports = router;
