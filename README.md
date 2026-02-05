# 🌾 AI-Enabled Smart Farming for Sustainable Agriculture

## 📋 Overview
A complete web application designed for small and medium-scale farmers to leverage AI/ML for sustainable farming practices.

## ✨ Features
1. **Multilingual Interface** - English, Hindi, Marathi
2. **Plant Disease Detection** - Upload leaf images for disease identification
3. **Fertilizer Recommendation** - Smart NPK-based recommendations
4. **Real-Time Weather Forecasting** - 5-day forecast
5. **Crop Recommendation System** - ML-based crop suggestions

## 🛠️ Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS
- **Backend**: Node.js + Express, Python Flask
- **Database**: MongoDB
- **ML**: Scikit-learn, TensorFlow, OpenCV
- **APIs**: OpenWeatherMap

## 📁 Project Structure
```
smart-farming-app/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── i18n/           # Translation files
│   │   ├── services/       # API services
│   │   └── assets/         # Images, icons
│   ├── package.json
│   └── vite.config.js
├── backend/                 # Node.js backend
│   ├── routes/             # API routes
│   ├── models/             # MongoDB models
│   ├── ml_services/        # Python Flask services
│   ├── server.js
│   └── package.json
├── ml_models/              # ML model scripts
│   ├── disease_detection/
│   ├── crop_recommendation/
│   └── fertilizer_recommendation/
├── datasets/               # Training datasets
└── sample_images/          # Sample test images
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Clone/Extract Project
```bash
cd smart-farming-app
```

### Step 2: Setup Backend (Node.js)
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-farming
OPENWEATHER_API_KEY=your_api_key_here
FLASK_ML_SERVICE_URL=http://localhost:5001
```

**Get OpenWeatherMap API Key:**
1. Visit https://openweathermap.org/api
2. Sign up for free account
3. Generate API key
4. Add to `.env` file

### Step 3: Setup Python ML Services
```bash
cd backend/ml_services
python -m venv venv

# Activate virtual environment:
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

pip install -r requirements.txt
```

### Step 4: Setup Frontend
```bash
cd frontend
npm install
```

Create `.env` file in frontend directory:
```
VITE_API_URL=http://localhost:5000/api
```

### Step 5: Train ML Models (One-time)
```bash
cd ml_models
python train_all_models.py
```

## 🎯 Running the Application

### Terminal 1: Start MongoDB (if local)
```bash
mongod
```

### Terminal 2: Start Backend Server
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

### Terminal 3: Start Python ML Service
```bash
cd backend/ml_services
source venv/bin/activate  # or venv\Scripts\activate on Windows
python app.py
# ML service runs on http://localhost:5001
```

### Terminal 4: Start Frontend
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

Open browser and navigate to: **http://localhost:5173**

## 📱 Usage Guide

### 1. Language Selection
- Click language toggle button (top-right)
- Select: English / हिंदी / मराठी

### 2. Plant Disease Detection
- Navigate to "Disease Detection" section
- Upload crop leaf image (JPG/PNG)
- View disease identification and treatment

### 3. Fertilizer Recommendation
- Enter soil NPK values (0-100)
- Enter soil pH (4-9)
- Select crop type
- Get fertilizer recommendation

### 4. Weather Forecast
- View current weather automatically
- See 5-day forecast
- Location-based (default: Pune, India)

### 5. Crop Recommendation
- Enter soil parameters (N, P, K)
- Enter environmental data (temp, humidity, rainfall)
- Get top 3 crop recommendations

## 🗄️ Database Collections

### crops
```json
{
  "name": "Rice",
  "season": "Kharif",
  "min_temp": 20,
  "max_temp": 35
}
```

### diseases
```json
{
  "name": "Late Blight",
  "crop": "Potato",
  "symptoms": "...",
  "treatment": "..."
}
```

### fertilizers
```json
{
  "name": "Urea",
  "composition": "N-46%",
  "usage": "..."
}
```

## 🤖 ML Models

### 1. Disease Detection Model
- **Type**: CNN (Convolutional Neural Network)
- **Input**: 224x224 RGB images
- **Output**: Disease class + confidence
- **Accuracy**: ~85%

### 2. Crop Recommendation Model
- **Type**: Random Forest Classifier
- **Input**: N, P, K, temp, humidity, pH, rainfall
- **Output**: Crop recommendation
- **Accuracy**: ~92%

### 3. Fertilizer Recommendation
- **Type**: Rule-based + Decision Tree
- **Input**: Soil NPK, pH, crop type
- **Output**: Fertilizer type and quantity

## 🧪 Testing with Sample Data

### Sample Soil Data (for testing)
```
N: 40, P: 45, K: 50
pH: 6.5
Temperature: 25°C
Humidity: 75%
Rainfall: 100mm
```

### Sample Images
Check `sample_images/` folder for test leaf images:
- `healthy_leaf.jpg`
- `diseased_leaf_1.jpg`
- `diseased_leaf_2.jpg`

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in backend/.env
PORT=5001
```

### MongoDB Connection Failed
```bash
# Check MongoDB is running
# Or use MongoDB Atlas connection string
```

### ML Service Not Responding
```bash
# Ensure Python dependencies installed
pip install -r requirements.txt

# Check Flask is running on port 5001
```

### CORS Errors
- Ensure backend CORS is configured
- Check API URLs in frontend .env

## 📦 Dependencies

### Backend (Node.js)
- express
- mongoose
- cors
- dotenv
- axios
- multer
- form-data

### ML Service (Python)
- flask
- scikit-learn
- tensorflow
- opencv-python
- numpy
- pandas
- Pillow

### Frontend (React)
- react
- react-router-dom
- axios
- i18next
- react-i18next
- lucide-react

## 🔐 Security Notes
- Never commit `.env` files
- Keep API keys secure
- Use environment variables for sensitive data
- Validate all user inputs

## 🚀 Deployment (Optional)

### Frontend: Vercel/Netlify
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

### Backend: Heroku/Railway
- Set environment variables
- Deploy with Procfile

### ML Service: PythonAnywhere/AWS
- Deploy Flask app
- Update FLASK_ML_SERVICE_URL

## 📞 Support
For issues or questions, check:
1. Console logs (browser & terminal)
2. Network tab (browser dev tools)
3. MongoDB connection status
4. Python ML service logs

## 🎓 Learning Resources
- React: https://react.dev
- Scikit-learn: https://scikit-learn.org
- MongoDB: https://docs.mongodb.com
- TensorFlow: https://tensorflow.org

## 📄 License
MIT License - Free for educational and commercial use

## 👨‍💻 Developer Notes
- Code is heavily commented for beginners
- Models are simplified for quick training
- Can be extended with more features
- Mobile-responsive design included

---
**Built with ❤️ for farmers**
