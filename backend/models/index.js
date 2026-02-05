const mongoose = require('mongoose');

// Crop Schema
const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  scientific_name: String,
  season: {
    type: String,
    enum: ['Kharif', 'Rabi', 'Zaid', 'Year-round']
  },
  min_temperature: Number,
  max_temperature: Number,
  min_humidity: Number,
  min_rainfall: Number,
  soil_type: String,
  ph_range: {
    min: Number,
    max: Number
  },
  npk_requirements: {
    nitrogen: { min: Number, max: Number },
    phosphorus: { min: Number, max: Number },
    potassium: { min: Number, max: Number }
  },
  expected_yield: String,
  growing_duration: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Disease Schema
const diseaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['fungal', 'bacterial', 'viral', 'pest']
  },
  crops_affected: [String],
  symptoms: [String],
  cause: String,
  treatment: {
    chemical: [String],
    organic: [String],
    preventive: [String]
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical']
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Fertilizer Schema
const fertilizerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['organic', 'chemical', 'bio-fertilizer']
  },
  composition: {
    nitrogen: Number,
    phosphorus: Number,
    potassium: Number,
    other: String
  },
  suitable_crops: [String],
  application_rate: String,
  application_method: String,
  timing: String,
  precautions: [String],
  price_range: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

// User Query Log Schema (for analytics)
const queryLogSchema = new mongoose.Schema({
  query_type: {
    type: String,
    enum: ['disease', 'fertilizer', 'weather', 'crop']
  },
  input_data: mongoose.Schema.Types.Mixed,
  result: mongoose.Schema.Types.Mixed,
  user_location: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Crop = mongoose.model('Crop', cropSchema);
const Disease = mongoose.model('Disease', diseaseSchema);
const Fertilizer = mongoose.model('Fertilizer', fertilizerSchema);
const QueryLog = mongoose.model('QueryLog', queryLogSchema);

module.exports = {
  Crop,
  Disease,
  Fertilizer,
  QueryLog
};
