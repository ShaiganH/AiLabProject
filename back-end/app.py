from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app, methods=["POST"]) 

# Load models
rf_diagnosis = joblib.load("best_diag.pkl")
rf_severity = joblib.load("best_sev.pkl")

# Load encoders
enc_gender = joblib.load("Gender_encoder.pkl")
enc_sym1 = joblib.load("Symptom_1_encoder.pkl")
enc_sym2 = joblib.load("Symptom_2_encoder.pkl")
enc_sym3 = joblib.load("Symptom_3_encoder.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    try:
        features = np.array([[ 
            data['Age'],
            enc_gender.transform([data['Gender']])[0],
            enc_sym1.transform([data['Symptom_1']])[0],
            enc_sym2.transform([data['Symptom_2']])[0],
            enc_sym3.transform([data['Symptom_3']])[0],
            data['Heart_Rate_bpm'],
            data['Body_Temperature_C'],
            data['Oxygen_Saturation_'],  # <- fixed key here
            data['Systolic'],
            data['Diastolic']
        ]])

        diagnosis = rf_diagnosis.predict(features)[0]

        if diagnosis == "Healthy":
            return jsonify({
                "Diagnosis": diagnosis,
                "Treatment_Plan": "No treatment needed"
            })

        severity = rf_severity.predict(features)[0]

        if severity == "Mild":
            treatment = "Rest and take fluids"
        elif severity == "Moderate":
            treatment = "Medication and rest"
        else:
            treatment = "Hospitalization and medication"

        return jsonify({
            "Diagnosis": diagnosis,
            "Severity": severity,
            "Treatment_Plan": treatment
        })

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
