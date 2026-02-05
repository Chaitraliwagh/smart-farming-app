import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Disease Detection
export const detectDisease = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const response = await axios.post(`${API_URL}/disease/detect`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Fertilizer Recommendation
export const getFertilizerRecommendation = async (data) => {
  const response = await api.post('/fertilizer/recommend', data);
  return response.data;
};

// Weather Forecast
export const getWeatherForecast = async (city = 'Pune') => {
  const response = await api.get(`/weather/forecast?city=${city}`);
  return response.data;
};

// Crop Recommendation
export const getCropRecommendation = async (data) => {
  const response = await api.post('/crop/recommend', data);
  return response.data;
};

export default api;
