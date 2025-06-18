import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report, accuracy_score
import joblib
import os
import pickle  # ✅ needed to save symptom list as a .pkl file

# Load dataset
DATASET_PATH = os.path.join("..", "dataset", "Training.csv")
df = pd.read_csv(DATASET_PATH)

# Clean data
if "Unnamed: 133" in df.columns:
    df = df.drop(columns=["Unnamed: 133"])
df = df.fillna(0)

# Split features and target
X = df.drop(columns=["prognosis"])
y = df["prognosis"]

# Save consistent symptom list
all_symptoms = sorted(X.columns.tolist())
with open("symptom_list.pkl", "wb") as f:
    pickle.dump(all_symptoms, f)

# Encode labels
encoder = LabelEncoder()
y_encoded = encoder.fit_transform(y)

# Split train/test
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
print("\n✅ Model Accuracy:", accuracy_score(y_test, y_pred))
print("\n📊 Classification Report:\n")
print(classification_report(y_test, y_pred, target_names=encoder.classes_))

# Save model and metadata
joblib.dump(model, "model.pkl")
joblib.dump(encoder, "encoder.pkl")
print("\n✅ Model, encoder, and symptom list saved successfully as .pkl")
