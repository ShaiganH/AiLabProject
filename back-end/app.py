from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app, methods=["POST", "GET"]) 

# Load models
rf_diagnosis = joblib.load("best_diag.pkl")
rf_severity = joblib.load("best_sev.pkl")

# Load encoders
enc_gender = joblib.load("Gender_encoder.pkl")
enc_sym1 = joblib.load("Symptom_1_encoder.pkl")
enc_sym2 = joblib.load("Symptom_2_encoder.pkl")
enc_sym3 = joblib.load("Symptom_3_encoder.pkl")

@app.route('/health', methods=['GET'])
def health_check():
    try:
        # Check if models are loaded
        models_status = {
            "diagnosis_model": rf_diagnosis is not None,
            "severity_model": rf_severity is not None,
            "gender_encoder": enc_gender is not None,
            "symptom_encoders": all([enc_sym1, enc_sym2, enc_sym3])
        }
        
        # Overall health status
        is_healthy = all(models_status.values())
        
        return jsonify({
            "status": "healthy" if is_healthy else "unhealthy",
            "message": "API is running and all models are loaded successfully!" if is_healthy else "Some models failed to load",
            "models": models_status,
            "timestamp": str(np.datetime64('now'))
        })
    except Exception as e:
        return jsonify({
            "status": "unhealthy",
            "message": f"Health check failed: {str(e)}",
            "timestamp": str(np.datetime64('now'))
        }), 500

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