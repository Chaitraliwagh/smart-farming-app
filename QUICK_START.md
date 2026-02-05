# 🚀 QUICK START GUIDE

## Prerequisites Check
Before starting, ensure you have:
- ✅ Node.js 16+ installed (`node --version`)
- ✅ Python 3.8+ installed (`python --version`)
- ✅ MongoDB installed (or MongoDB Atlas account)
- ✅ Git installed (optional)

## Step-by-Step Setup (15 minutes)

### 1️⃣ Extract Project
```bash
# Extract the ZIP file to your desired location
cd smart-farming-app
```

### 2️⃣ Get OpenWeather API Key (2 minutes)
1. Go to https://openweathermap.org/api
2. Click "Sign Up" (Free tier is sufficient)
3. Verify your email
4. Go to "API keys" section
5. Copy your API key

### 3️⃣ Setup Backend (5 minutes)
```bash
cd backend
npm install

# Create .env file
# On Windows:
copy .env.example .env

# On Mac/Linux:
cp .env.example .env

# Edit .env file and add your OpenWeather API key:
# OPENWEATHER_API_KEY=your_actual_api_key_here
```

### 4️⃣ Setup Python ML Service (5 minutes)
```bash
cd backend/ml_services

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 5️⃣ Train ML Models (2 minutes)
```bash
cd ../../ml_models
python train_all_models.py
```

### 6️⃣ Setup Frontend (3 minutes)
```bash
cd ../frontend
npm install

# Create .env file
# On Windows:
copy .env.example .env
# On Mac/Linux:
cp .env.example .env
```

## 🎯 Running the Application

You need 4 terminal windows:

### Terminal 1: MongoDB
```bash
# Start MongoDB
mongod

# Or if using MongoDB as a service, it should already be running
```

### Terminal 2: Backend Server
```bash
cd backend
npm start

# Should see: "🚀 Server running on port 5000"
```

### Terminal 3: Python ML Service
```bash
cd backend/ml_services
source venv/bin/activate  # or venv\Scripts\activate on Windows
python app.py

# Should see: "🚀 Starting ML Service on port 5001..."
```

### Terminal 4: Frontend
```bash
cd frontend
npm run dev

# Should see: "Local: http://localhost:5173"
```

### 7️⃣ Open Application
Open your browser and go to: **http://localhost:5173**

## ✅ Verify Everything Works

### Test Disease Detection:
1. Click "Disease Detection" tab
2. Upload any image of a leaf
3. Click "Analyze"
4. Should see results within 2-3 seconds

### Test Fertilizer Recommendation:
1. Click "Fertilizer Recommendation" tab
2. Enter values: N=40, P=45, K=50, pH=6.5
3. Select a crop (e.g., Rice)
4. Click "Get Recommendation"
5. Should see fertilizer suggestions

### Test Weather Forecast:
1. Click "Weather Forecast" tab
2. Should automatically load Pune weather
3. Try searching for other cities

### Test Crop Recommendation:
1. Click "Crop Recommendation" tab
2. Enter sample values:
   - N=40, P=45, K=50
   - Temperature=25, Humidity=75
   - pH=6.5, Rainfall=100
3. Click "Get Recommendation"
4. Should see top 3 recommended crops

### Test Language Switching:
1. Click language dropdown (top right)
2. Try switching between English, Hindi, Marathi
3. All text should translate

## 🐛 Troubleshooting

### Issue: "Cannot find module 'express'"
**Solution:** Run `npm install` in the backend directory

### Issue: "ML service is not available"
**Solution:** 
1. Make sure Python Flask service is running on port 5001
2. Check if virtual environment is activated
3. Verify all Python packages are installed

### Issue: "MongoDB connection failed"
**Solution:**
1. Make sure MongoDB is running (`mongod`)
2. Or comment out MongoDB in server.js (app will work without it)

### Issue: "Invalid API key" (Weather)
**Solution:**
1. Verify you added the correct OpenWeather API key to backend/.env
2. Wait a few minutes after creating the key (activation time)

### Issue: Port already in use
**Solution:**
```bash
# Change ports in .env files
# Backend: Change PORT=5000 to PORT=5001
# ML Service: Change port in app.py
# Frontend: Change in vite.config.js
```

### Issue: Frontend shows blank page
**Solution:**
1. Check browser console for errors (F12)
2. Ensure backend is running
3. Clear browser cache and reload

## 📱 Using the Application

### For Farmers (Simple Instructions):

**To check plant disease:**
1. Take a clear photo of the plant leaf
2. Go to "Disease Detection"
3. Upload the photo
4. Read the results and treatment

**To get fertilizer advice:**
1. Get your soil tested (NPK values)
2. Go to "Fertilizer Recommendation"
3. Enter your soil values
4. Get the right fertilizer recommendation

**To check weather:**
1. Go to "Weather Forecast"
2. Enter your city name
3. See current weather and 5-day forecast

**To decide which crop to plant:**
1. Get your soil and weather data
2. Go to "Crop Recommendation"
3. Enter all the values
4. See which crops are best for you

## 🎓 Sample Test Data

Use these values to test the application:

**Good Soil (Balanced):**
- N: 40, P: 45, K: 50
- pH: 6.5
- Temperature: 25°C
- Humidity: 75%
- Rainfall: 100mm

**Nitrogen Deficient Soil:**
- N: 15, P: 45, K: 50
- pH: 6.5

**Phosphorus Deficient Soil:**
- N: 40, P: 20, K: 50
- pH: 6.5

## 🔒 Security Notes

- Never commit .env files to version control
- Keep your API keys secure
- Use environment variables for sensitive data
- Validate all user inputs

## 📚 Additional Resources

- **React Documentation:** https://react.dev
- **TailwindCSS:** https://tailwindcss.com
- **Scikit-learn:** https://scikit-learn.org
- **MongoDB:** https://docs.mongodb.com
- **OpenWeather API:** https://openweathermap.org/api

## 💡 Tips for Better Results

1. **Disease Detection:**
   - Use clear, well-lit photos
   - Focus on the leaf with disease symptoms
   - Avoid blurry images

2. **Fertilizer Recommendation:**
   - Get professional soil testing for accurate NPK values
   - Test soil at multiple locations in your field
   - Consider soil pH carefully

3. **Crop Recommendation:**
   - Use average values for your region
   - Consider historical weather data
   - Consult with local agricultural experts

## 🆘 Need Help?

If you encounter any issues:
1. Check the console logs (browser and terminal)
2. Review this guide again
3. Check the main README.md for detailed information
4. Verify all services are running

## 🎉 Success!

If you can:
- ✅ See the homepage
- ✅ Switch languages
- ✅ Upload an image for disease detection
- ✅ Get fertilizer recommendations
- ✅ See weather forecast
- ✅ Get crop recommendations

**Congratulations! Your Smart Farming App is fully functional!** 🌾

---
**Built with ❤️ for farmers and sustainable agriculture**
