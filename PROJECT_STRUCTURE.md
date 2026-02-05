# 📁 Project Structure

```
smart-farming-app/
│
├── 📄 README.md                    # Main documentation
├── 📄 QUICK_START.md              # Quick setup guide
│
├── 📁 frontend/                    # React Frontend
│   ├── 📁 src/
│   │   ├── 📁 components/         # React components
│   │   │   ├── Home.jsx           # Home page
│   │   │   ├── DiseaseDetection.jsx
│   │   │   ├── FertilizerRecommendation.jsx
│   │   │   ├── WeatherForecast.jsx
│   │   │   └── CropRecommendation.jsx
│   │   ├── 📁 i18n/               # Translations
│   │   │   └── config.js          # i18n configuration (EN/HI/MR)
│   │   ├── 📁 services/
│   │   │   └── api.js             # API service layer
│   │   ├── App.jsx                # Main app component
│   │   ├── main.jsx               # Entry point
│   │   └── index.css              # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.example
│
├── 📁 backend/                     # Node.js Backend
│   ├── 📁 routes/                 # API routes
│   │   ├── disease.js             # Disease detection endpoint
│   │   ├── fertilizer.js          # Fertilizer recommendation endpoint
│   │   ├── weather.js             # Weather forecast endpoint
│   │   └── crop.js                # Crop recommendation endpoint
│   ├── 📁 ml_services/            # Python Flask ML Service
│   │   ├── app.py                 # Flask app with ML logic
│   │   └── requirements.txt       # Python dependencies
│   ├── server.js                  # Express server
│   ├── package.json
│   └── .env.example               # Environment variables template
│
├── 📁 ml_models/                   # ML Models Directory
│   ├── 📁 disease_detection/
│   │   └── README.txt             # Instructions for CNN training
│   ├── 📁 crop_recommendation/
│   │   └── crop_model.pkl         # Trained Random Forest model
│   ├── 📁 fertilizer_recommendation/
│   └── train_all_models.py        # Model training script
│
├── 📁 datasets/                    # Training Datasets
│   └── crop_recommendation.csv    # Crop training data
│
└── 📁 sample_images/               # Sample test images
    └── README.txt                  # Image requirements

```

## Component Breakdown

### Frontend Components
- **Home.jsx**: Landing page with feature cards
- **DiseaseDetection.jsx**: Upload & analyze plant images
- **FertilizerRecommendation.jsx**: Input soil data, get fertilizer advice
- **WeatherForecast.jsx**: Real-time weather & 5-day forecast
- **CropRecommendation.jsx**: ML-based crop suggestions

### Backend Routes
- **/api/disease/detect**: POST - Analyze plant disease
- **/api/fertilizer/recommend**: POST - Get fertilizer recommendation
- **/api/weather/forecast**: GET - Fetch weather data
- **/api/crop/recommend**: POST - Get crop recommendations

### ML Service Endpoints
- **/predict/disease**: Image-based disease detection
- **/predict/fertilizer**: Rule-based fertilizer recommendation
- **/predict/crop**: ML-based crop recommendation

## Data Flow

```
User Interface (React)
        ↓
  API Request (Axios)
        ↓
Backend Routes (Express)
        ↓
    ┌───┴───┐
    ↓       ↓
Weather API  ML Service (Flask)
    ↓       ↓
Backend Routes
    ↓
JSON Response
    ↓
React Components
    ↓
User Interface
```

## Technology Stack

**Frontend:**
- React 18 (UI framework)
- Vite (Build tool)
- Tailwind CSS (Styling)
- i18next (Internationalization)
- Axios (HTTP client)
- Lucide React (Icons)

**Backend:**
- Node.js + Express (API server)
- Mongoose (MongoDB ODM)
- Multer (File upload)
- Axios (HTTP client)
- CORS (Cross-origin support)

**ML Service:**
- Python Flask (API framework)
- Scikit-learn (ML models)
- TensorFlow/Keras (Deep learning - optional)
- OpenCV (Image processing)
- Pandas (Data manipulation)
- NumPy (Numerical computing)

**Database:**
- MongoDB (Optional - app works without it)

**External APIs:**
- OpenWeatherMap API (Weather data)

## File Sizes (Approximate)

```
Total Project Size: ~50MB (after npm install)

Frontend:
  - node_modules/: ~200MB
  - src/: ~100KB
  
Backend:
  - node_modules/: ~50MB
  - routes/: ~20KB
  - ml_services/venv/: ~500MB (Python packages)
  
ML Models:
  - crop_model.pkl: ~1MB
  - datasets/: ~10KB
```

## Key Features Implementation

### 🌍 Multilingual Support
- Uses i18next for translations
- 3 languages: English, Hindi, Marathi
- All UI text dynamically translated
- Language stored in browser state

### 🦠 Disease Detection
- Image upload via Multer
- Forwarded to Flask ML service
- CNN or rule-based classification
- Returns disease name, confidence, treatment

### 🌱 Fertilizer Recommendation
- Rule-based expert system
- Considers NPK values & pH
- Crop-specific recommendations
- Application method guidance

### 🌦️ Weather Forecast
- OpenWeatherMap API integration
- Real-time current weather
- 5-day forecast display
- City-based search

### 🌾 Crop Recommendation
- Random Forest ML model
- 7 input features (N, P, K, temp, humidity, pH, rainfall)
- Returns top 3 suitable crops
- Suitability scoring

## Performance Considerations

- Images resized to 224x224 for ML processing
- API responses cached where appropriate
- Lazy loading for components
- Optimized bundle size with Vite
- Efficient state management in React

## Security Features

- Environment variables for sensitive data
- Input validation on all forms
- File type/size restrictions on uploads
- CORS configuration
- Error handling middleware

---

This structure ensures:
✅ Separation of concerns
✅ Easy maintenance
✅ Scalability
✅ Clear data flow
✅ Production-ready code
