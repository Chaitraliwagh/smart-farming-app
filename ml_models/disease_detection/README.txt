
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
