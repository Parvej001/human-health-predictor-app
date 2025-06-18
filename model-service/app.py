# service.py — Robust Flask backend for AI Disease Predictor
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os
import traceback

app = Flask(__name__)
CORS(app)

MODEL_PATH = "model.pkl"
ENCODER_PATH = "encoder.pkl"
SYMPTOM_PATH = "symptoms.npy"

# Load assets with error handling
try:
    model = joblib.load(MODEL_PATH)
    encoder = joblib.load(ENCODER_PATH)
    symptoms_list = np.load(SYMPTOM_PATH, allow_pickle=True)
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
    input_symptoms = data.get("symptoms", [])

    if not input_symptoms or not isinstance(input_symptoms, list):
        return jsonify({"error": "Invalid or empty symptoms list"}), 400

    try:
        input_data = [0] * len(symptoms_list)
        unmapped = []

        for symptom in input_symptoms:
            index = symptom_index.get(symptom)
            if index is not None:
                input_data[index] = 1
            else:
                unmapped.append(symptom)

        input_array = np.array(input_data).reshape(1, -1)
        probs = model.predict_proba(input_array)[0]
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
