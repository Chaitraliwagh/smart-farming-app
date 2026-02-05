import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      home: "Home",
      diseaseDetection: "Disease Detection",
      fertilizerRecommendation: "Fertilizer Recommendation",
      weatherForecast: "Weather Forecast",
      cropRecommendation: "Crop Recommendation",
      
      // Home Page
      welcomeTitle: "Welcome to Smart Farming",
      welcomeSubtitle: "AI-powered tools for sustainable agriculture",
      getStarted: "Get Started",
      
      // Disease Detection
      uploadImage: "Upload Leaf Image",
      uploadImageDesc: "Upload a clear image of the crop leaf",
      selectImage: "Select Image",
      analyze: "Analyze",
      diseaseResult: "Disease Analysis Result",
      disease: "Disease",
      confidence: "Confidence",
      cause: "Cause",
      treatment: "Treatment",
      healthyPlant: "Healthy Plant",
      noDisease: "No disease detected. Your plant appears healthy!",
      
      // Fertilizer Recommendation
      soilNitrogen: "Soil Nitrogen (N)",
      soilPhosphorus: "Soil Phosphorus (P)",
      soilPotassium: "Soil Potassium (K)",
      soilPH: "Soil pH",
      cropType: "Crop Type",
      selectCrop: "Select crop type",
      rice: "Rice",
      wheat: "Wheat",
      corn: "Corn",
      potato: "Potato",
      tomato: "Tomato",
      getRecommendation: "Get Recommendation",
      fertilizerResult: "Fertilizer Recommendation",
      recommendedFertilizer: "Recommended Fertilizer",
      quantity: "Quantity",
      applicationMethod: "Application Method",
      
      // Weather
      currentWeather: "Current Weather",
      temperature: "Temperature",
      humidity: "Humidity",
      rainProbability: "Rain Probability",
      dayForecast: "5-Day Forecast",
      
      // Crop Recommendation
      enterSoilData: "Enter Soil & Environmental Data",
      avgTemperature: "Average Temperature (°C)",
      avgHumidity: "Average Humidity (%)",
      rainfall: "Rainfall (mm)",
      recommendedCrops: "Recommended Crops",
      crop: "Crop",
      suitability: "Suitability",
      expectedYield: "Expected Yield",
      season: "Season",
      
      // Common
      loading: "Loading...",
      error: "Error",
      submit: "Submit",
      reset: "Reset",
      back: "Back",
      next: "Next",
      
      // Footer
      poweredBy: "Powered by AI & ML",
      forFarmers: "Made for Farmers"
    }
  },
  hi: {
    translation: {
      // Navigation
      home: "होम",
      diseaseDetection: "रोग पहचान",
      fertilizerRecommendation: "उर्वरक सुझाव",
      weatherForecast: "मौसम पूर्वानुमान",
      cropRecommendation: "फसल सुझाव",
      
      // Home Page
      welcomeTitle: "स्मार्ट खेती में आपका स्वागत है",
      welcomeSubtitle: "टिकाऊ कृषि के लिए AI-संचालित उपकरण",
      getStarted: "शुरू करें",
      
      // Disease Detection
      uploadImage: "पत्ती की तस्वीर अपलोड करें",
      uploadImageDesc: "फसल की पत्ती की स्पष्ट तस्वीर अपलोड करें",
      selectImage: "तस्वीर चुनें",
      analyze: "विश्लेषण करें",
      diseaseResult: "रोग विश्लेषण परिणाम",
      disease: "रोग",
      confidence: "विश्वास",
      cause: "कारण",
      treatment: "उपचार",
      healthyPlant: "स्वस्थ पौधा",
      noDisease: "कोई रोग नहीं पाया गया। आपका पौधा स्वस्थ दिखता है!",
      
      // Fertilizer Recommendation
      soilNitrogen: "मिट्टी नाइट्रोजन (N)",
      soilPhosphorus: "मिट्टी फास्फोरस (P)",
      soilPotassium: "मिट्टी पोटेशियम (K)",
      soilPH: "मिट्टी pH",
      cropType: "फसल का प्रकार",
      selectCrop: "फसल चुनें",
      rice: "धान",
      wheat: "गेहूं",
      corn: "मक्का",
      potato: "आलू",
      tomato: "टमाटर",
      getRecommendation: "सुझाव प्राप्त करें",
      fertilizerResult: "उर्वरक सुझाव",
      recommendedFertilizer: "सुझाया गया उर्वरक",
      quantity: "मात्रा",
      applicationMethod: "उपयोग विधि",
      
      // Weather
      currentWeather: "वर्तमान मौसम",
      temperature: "तापमान",
      humidity: "आर्द्रता",
      rainProbability: "बारिश की संभावना",
      dayForecast: "5-दिन का पूर्वानुमान",
      
      // Crop Recommendation
      enterSoilData: "मिट्टी और पर्यावरण डेटा दर्ज करें",
      avgTemperature: "औसत तापमान (°C)",
      avgHumidity: "औसत आर्द्रता (%)",
      rainfall: "वर्षा (mm)",
      recommendedCrops: "सुझाई गई फसलें",
      crop: "फसल",
      suitability: "उपयुक्तता",
      expectedYield: "अपेक्षित उपज",
      season: "मौसम",
      
      // Common
      loading: "लोड हो रहा है...",
      error: "त्रुटि",
      submit: "जमा करें",
      reset: "रीसेट करें",
      back: "वापस",
      next: "आगे",
      
      // Footer
      poweredBy: "AI और ML द्वारा संचालित",
      forFarmers: "किसानों के लिए बनाया गया"
    }
  },
  mr: {
    translation: {
      // Navigation
      home: "मुख्यपृष्ठ",
      diseaseDetection: "रोग ओळख",
      fertilizerRecommendation: "खत शिफारस",
      weatherForecast: "हवामान अंदाज",
      cropRecommendation: "पीक शिफारस",
      
      // Home Page
      welcomeTitle: "स्मार्ट शेतीमध्ये आपले स्वागत आहे",
      welcomeSubtitle: "शाश्वत शेतीसाठी AI-चालित साधने",
      getStarted: "सुरू करा",
      
      // Disease Detection
      uploadImage: "पानाचा फोटो अपलोड करा",
      uploadImageDesc: "पिकाच्या पानाचा स्पष्ट फोटो अपलोड करा",
      selectImage: "फोटो निवडा",
      analyze: "विश्लेषण करा",
      diseaseResult: "रोग विश्लेषण परिणाम",
      disease: "रोग",
      confidence: "विश्वास",
      cause: "कारण",
      treatment: "उपचार",
      healthyPlant: "निरोगी वनस्पती",
      noDisease: "कोणताही रोग आढळला नाही. तुमची वनस्पती निरोगी दिसते!",
      
      // Fertilizer Recommendation
      soilNitrogen: "माती नायट्रोजन (N)",
      soilPhosphorus: "माती फॉस्फरस (P)",
      soilPotassium: "माती पोटॅशियम (K)",
      soilPH: "माती pH",
      cropType: "पिकाचा प्रकार",
      selectCrop: "पीक निवडा",
      rice: "तांदूळ",
      wheat: "गहू",
      corn: "मका",
      potato: "बटाटा",
      tomato: "टोमॅटो",
      getRecommendation: "शिफारस मिळवा",
      fertilizerResult: "खत शिफारस",
      recommendedFertilizer: "शिफारस केलेले खत",
      quantity: "प्रमाण",
      applicationMethod: "वापर पद्धत",
      
      // Weather
      currentWeather: "सध्याचे हवामान",
      temperature: "तापमान",
      humidity: "आर्द्रता",
      rainProbability: "पाऊस पडण्याची शक्यता",
      dayForecast: "5-दिवसांचा अंदाज",
      
      // Crop Recommendation
      enterSoilData: "माती आणि पर्यावरण डेटा प्रविष्ट करा",
      avgTemperature: "सरासरी तापमान (°C)",
      avgHumidity: "सरासरी आर्द्रता (%)",
      rainfall: "पर्जन्यमान (mm)",
      recommendedCrops: "शिफारस केलेली पिके",
      crop: "पीक",
      suitability: "योग्यता",
      expectedYield: "अपेक्षित उत्पन्न",
      season: "हंगाम",
      
      // Common
      loading: "लोड होत आहे...",
      error: "त्रुटी",
      submit: "सबमिट करा",
      reset: "रीसेट करा",
      back: "मागे",
      next: "पुढे",
      
      // Footer
      poweredBy: "AI आणि ML द्वारे चालविले",
      forFarmers: "शेतकऱ्यांसाठी तयार केले"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
