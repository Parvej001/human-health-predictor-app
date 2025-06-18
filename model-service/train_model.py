import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report, accuracy_score
import joblib
import os

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
print("\nModel Accuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:\n")
print(classification_report(y_test, y_pred, target_names=encoder.classes_))

# Save model and metadata
joblib.dump(model, "model.pkl")
joblib.dump(encoder, "encoder.pkl")
np.save("symptoms.npy", X.columns)
print("\nModel, encoder, and symptoms list saved successfully.")



