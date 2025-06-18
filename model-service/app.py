# service.py — Robust Flask backend for AI Disease Predictor
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os
import traceback
import pickle  # <-- Added to load symptom_list.pkl

app = Flask(__name__)
CORS(app)

# File paths
MODEL_PATH = "model.pkl"
ENCODER_PATH = "encoder.pkl"
SYMPTOM_PATH = "symptom_list.pkl"  # <-- Updated to use pickle version

# Load assets with error handling
try:
    model = joblib.load(MODEL_PATH)
    encoder = joblib.load(ENCODER_PATH)
    with open(SYMPTOM_PATH, "rb") as f:
        symptoms_list = pickle.load(f)  # <-- Load symptoms using pickle
except Exception as e:
    print("❌ Error loading model or files:", e)
    traceback.print_exc()
    exit(1)

# Map symptom to index
symptom_index = {symptom: idx for idx, symptom in enumerate(symptoms_list)}

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "Model server running ✅"})

@app.route("/symptoms", methods=["GET"])
def get_symptoms():
    return jsonify({"symptoms": list(symptoms_list)})

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    symptoms = data.get("symptoms", [])

    print("🛠️ Received symptoms:", symptoms)

    if not symptoms or not isinstance(symptoms, list):
        print("❌ Invalid or empty symptoms list.")
        return jsonify({"error": "Invalid or empty symptoms list"}), 400

    try:
        input_data = [0] * len(symptoms_list)
        unmapped = []

        for symptom in symptoms:
            index = symptom_index.get(symptom)
            if index is not None:
                input_data[index] = 1
            else:
                unmapped.append(symptom)

        print("🧠 Input vector:", input_data)

        input_array = np.array(input_data).reshape(1, -1)
        probs = model.predict_proba(input_array)[0]
        print("📊 Probabilities:", probs)

        top3_idx = np.argsort(probs)[::-1][:3]
        predictions = [
            {
                "disease": encoder.classes_[i],
                "confidence": round(probs[i] * 100, 2)
            }
            for i in top3_idx
        ]

        return jsonify({
            "predictions": predictions,
            "unmapped": unmapped
        })

    except Exception as e:
        print("❌ Prediction error:", e)
        traceback.print_exc()
        return jsonify({"error": "Prediction failed"}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
