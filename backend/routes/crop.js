const express = require('express');
const router = express.Router();
const axios = require('axios');

// POST /api/crop/recommend - Get crop recommendation
router.post('/recommend', async (req, res) => {
  try {
    const { nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall } = req.body;

    // Validation
    if (!nitrogen || !phosphorus || !potassium || !temperature || !humidity || !ph || !rainfall) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['nitrogen', 'phosphorus', 'potassium', 'temperature', 'humidity', 'ph', 'rainfall']
      });
    }

    // Forward request to Python ML service
    const flaskUrl = process.env.FLASK_ML_SERVICE_URL || 'http://localhost:5001';
    
    const response = await axios.post(`${flaskUrl}/predict/crop`, {
      nitrogen: parseFloat(nitrogen),
      phosphorus: parseFloat(phosphorus),
      potassium: parseFloat(potassium),
      temperature: parseFloat(temperature),
      humidity: parseFloat(humidity),
      ph: parseFloat(ph),
      rainfall: parseFloat(rainfall)
    }, {
      timeout: 10000 // 10 seconds timeout
    });

    res.json(response.data);
  } catch (error) {
    console.error('Crop recommendation error:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({ 
        error: 'ML service is not available. Please ensure the Python Flask service is running on port 5001.' 
      });
    }

    res.status(500).json({ 
      error: 'Failed to get crop recommendation',
      message: error.response?.data?.error || error.message
    });
  }
});

module.exports = router;
