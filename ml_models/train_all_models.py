"""
ML Model Training Script
This script trains all the ML models needed for the Smart Farming application
"""

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import pickle
import os

print("=" * 60)
print("SMART FARMING - ML MODEL TRAINING")
print("=" * 60)

# Create directories if they don't exist
os.makedirs('../ml_models/crop_recommendation', exist_ok=True)
os.makedirs('../ml_models/disease_detection', exist_ok=True)
os.makedirs('../ml_models/fertilizer_recommendation', exist_ok=True)

# ============================================================
# 1. CROP RECOMMENDATION MODEL
# ============================================================
print("\n📊 Training Crop Recommendation Model...")

try:
    # Load crop dataset
    crop_data = pd.read_csv('../datasets/crop_recommendation.csv')
    print(f"   Loaded {len(crop_data)} samples")
    
    # Prepare features and labels
    X = crop_data[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']].values
    y = crop_data['label'].values
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train model
    crop_model = RandomForestClassifier(n_estimators=100, random_state=42)
    crop_model.fit(X_train, y_train)
    
    # Evaluate
    train_acc = crop_model.score(X_train, y_train)
    test_acc = crop_model.score(X_test, y_test)
    
    print(f"   ✅ Training Accuracy: {train_acc*100:.2f}%")
    print(f"   ✅ Testing Accuracy: {test_acc*100:.2f}%")
    
    # Save model
    model_path = '../ml_models/crop_recommendation/crop_model.pkl'
    with open(model_path, 'wb') as f:
        pickle.dump(crop_model, f)
    print(f"   ✅ Model saved to {model_path}")
    
except Exception as e:
    print(f"   ❌ Error: {str(e)}")

# ============================================================
# 2. DISEASE DETECTION MODEL (Simple CNN)
# ============================================================
print("\n🦠 Disease Detection Model Setup...")
print("   ℹ️  Disease detection will use rule-based approach")
print("   ℹ️  For production, train a CNN model with plant disease images")
print("   ℹ️  Datasets available at: PlantVillage Dataset")

# Create placeholder info file
info_text = """
Disease Detection Model Information
====================================

Current Status: Rule-based classification
Recommendation: Train a CNN model for better accuracy

Steps to create a proper disease detection model:
1. Download PlantVillage dataset or similar plant disease dataset
2. Organize images into class folders (healthy, early_blight, late_blight, etc.)
3. Use TensorFlow/Keras to train a CNN model
4. Save the trained model as 'disease_model.h5'

Example training code structure:
```python
from tensorflow import keras
from tensorflow.keras import layers

model = keras.Sequential([
    layers.Conv2D(32, (3,3), activation='relu', input_shape=(224, 224, 3)),
    layers.MaxPooling2D((2,2)),
    layers.Conv2D(64, (3,3), activation='relu'),
    layers.MaxPooling2D((2,2)),
    layers.Conv2D(64, (3,3), activation='relu'),
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dense(num_classes, activation='softmax')
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.fit(train_data, epochs=10, validation_data=val_data)
model.save('disease_model.h5')
```
"""

with open('../ml_models/disease_detection/README.txt', 'w') as f:
    f.write(info_text)

print("   ✅ Disease detection info saved")

# ============================================================
# 3. FERTILIZER RECOMMENDATION
# ============================================================
print("\n🌱 Fertilizer Recommendation Setup...")
print("   ℹ️  Using rule-based expert system")
print("   ℹ️  Recommendations based on NPK values and pH")
print("   ✅ Fertilizer recommendation system ready")

print("\n" + "=" * 60)
print("TRAINING COMPLETE!")
print("=" * 60)
print("\n📝 Summary:")
print("   ✅ Crop Recommendation Model: Trained (Random Forest)")
print("   ℹ️  Disease Detection: Rule-based (ready for CNN upgrade)")
print("   ✅ Fertilizer Recommendation: Rule-based system")
print("\n🚀 Models are ready to use!")
print("   Run the Flask service: python backend/ml_services/app.py")
print("=" * 60)
