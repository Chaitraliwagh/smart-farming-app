const express = require('express');
const router = express.Router();
const axios = require('axios');

// POST /api/fertilizer/recommend - Get fertilizer recommendation
router.post('/recommend', async (req, res) => {
  try {
    const { nitrogen, phosphorus, potassium, ph, crop_type } = req.body;

    // Validation
    if (!nitrogen || !phosphorus || !potassium || !ph || !crop_type) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['nitrogen', 'phosphorus', 'potassium', 'ph', 'crop_type']
      });
    }

    // Forward request to Python ML service
    const flaskUrl = process.env.FLASK_ML_SERVICE_URL || 'http://localhost:5001';
    
    const response = await axios.post(`${flaskUrl}/predict/fertilizer`, {
      nitrogen: parseFloat(nitrogen),
      phosphorus: parseFloat(phosphorus),
      potassium: parseFloat(potassium),
      ph: parseFloat(ph),
      crop_type: crop_type
    }, {
      timeout: 10000 // 10 seconds timeout
    });

    res.json(response.data);
  } catch (error) {
    console.error('Fertilizer recommendation error:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({ 
        error: 'ML service is not available. Please ensure the Python Flask service is running on port 5001.' 
      });
    }

    res.status(500).json({ 
      error: 'Failed to get fertilizer recommendation',
      message: error.response?.data?.error || error.message
    });
  }
});

module.exports = router;
