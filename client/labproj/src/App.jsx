import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeartbeat,
  faUserMd,
  faSearch,
  faChartLine,
  faMicroscope
} from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [formData, setFormData] = useState({
    Age: '',
    Gender: '',
    Symptom_1: '',
    Symptom_2: '',
    Symptom_3: '',
    Heart_Rate_bpm: '',
    Body_Temperature_C: '',
    Oxygen_Saturation_: '',
    Systolic: '',
    Diastolic: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [response, setResponse] = useState(null);

  const symptoms = [
    'Fever', 'Cough', 'Fatigue', 'Headache',
    'Body ache', 'Shortness of breath', 'Sore throat', 'Runny nose', 'None'
  ];

  const validateField = (name, value) => {
    switch (name) {
      case 'Age':
        if (value === '') return 'Age is required';
        if (+value < 0) return 'Age must be 0 or more';
        break;
      case 'Gender':
        if (!value) return 'Gender is required';
        break;
      case 'Heart_Rate_bpm':
        if (value === '') return 'Heart rate is required';
        if (+value < 30) return 'Minimum 30 bpm';
        break;
      case 'Body_Temperature_C':
        if (value === '') return 'Body temperature is required';
        if (+value < 10) return 'Minimum 10°C';
        break;
      case 'Oxygen_Saturation_':
        if (value === '') return 'Oxygen level is required';
        if (+value < 80) return 'Minimum 80%';
        break;
      case 'Systolic':
        if (value === '') return 'Systolic is required';
        if (+value < 50) return 'Minimum 50 mmHg';
        break;
      case 'Diastolic':
        if (value === '') return 'Diastolic is required';
        if (+value < 40) return 'Minimum 40 mmHg';
        break;
      case 'Symptom_1':
        if (!value) return 'Primary symptom is required';
        break;
      default:
        return '';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTouched = {};
    Object.keys(formData).forEach((key) => {
      newTouched[key] = true;
    });
    setTouched(newTouched);

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await fetch('http://localhost:5001/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setResponse(data);
    } catch {
      setResponse({ error: 'Error fetching data' });
    }
  };

  const renderInput = (label, name, type, min, placeholder) => (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        min={min}
        placeholder={placeholder}
        className={touched[name] && errors[name] ? 'invalid' : ''}
      />
      {touched[name] && errors[name] && (
        <div className="error">{errors[name]}</div>
      )}
    </div>
  );

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="header-content">
            <h1 className="title">
              <FontAwesomeIcon icon={faHeartbeat} /> AI Disease Detection
            </h1>
            <p className="subtitle">Advanced symptom analysis powered by machine learning</p>
            <button className="health-check-btn">
              <FontAwesomeIcon icon={faHeartbeat} /> Check API Health
            </button>
          </div>
        </header>

        <main className="main-content">
          <div className="form-container">
            <h2 className="form-title">
              <FontAwesomeIcon icon={faUserMd} /> Patient Symptom Analysis
            </h2>
            <form onSubmit={handleSubmit} className="form">
              {renderInput('Age', 'Age', 'number', 0, '0')}
              <div className="form-group">
                <label>Gender</label>
                <select
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.Gender && errors.Gender ? 'invalid' : ''}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {touched.Gender && errors.Gender && (
                  <div className="error">{errors.Gender}</div>
                )}
              </div>
              {renderInput('Heart Rate (bpm)', 'Heart_Rate_bpm', 'number', 30, '30')}
              {renderInput('Body Temperature (°C)', 'Body_Temperature_C', 'number', 10, '10')}
              {renderInput('Oxygen Saturation (%)', 'Oxygen_Saturation_', 'number', 80, '80')}

              <div className="form-group">
                <label>Blood Pressure (mmHg)</label>
                <div className="blood-pressure">
                  <input
                    type="number"
                    name="Systolic"
                    placeholder="50"
                    min="50"
                    value={formData.Systolic}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touched.Systolic && errors.Systolic ? 'invalid' : ''}
                  />
                  <span>/</span>
                  <input
                    type="number"
                    name="Diastolic"
                    placeholder="40"
                    min="40"
                    value={formData.Diastolic}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touched.Diastolic && errors.Diastolic ? 'invalid' : ''}
                  />
                </div>
                {touched.Systolic && errors.Systolic && <div className="error">{errors.Systolic}</div>}
                {touched.Diastolic && errors.Diastolic && <div className="error">{errors.Diastolic}</div>}
              </div>

              {['Symptom_1', 'Symptom_2', 'Symptom_3'].map((sym, i) => (
                <div className="form-group" key={sym}>
                  <label>{['Primary', 'Secondary', 'Tertiary'][i]} Symptom</label>
                  <select
                    name={sym}
                    value={formData[sym]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touched[sym] && errors[sym] ? 'invalid' : ''}
                  >
                    <option value="">Select Symptom</option>
                    {symptoms.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {touched[sym] && errors[sym] && (
                    <div className="error">{errors[sym]}</div>
                  )}
                </div>
              ))}

              <button type="submit" className="submit-btn">
                <FontAwesomeIcon icon={faSearch} /> Analyze Symptoms
              </button>
            </form>
          </div>

          <div className="results-panel">
            <h2 className="results-title">
              <FontAwesomeIcon icon={faChartLine} /> Diagnosis Results
            </h2>
            {response && (
              <div className="results">
                <div className="result-card">
                  <h3>Diagnosis</h3>
                  <p>{response.Diagnosis || '-'}</p>
                </div>
                <div className="result-card">
                  <h3>Severity</h3>
                  <p>{response.Severity || '-'}</p>
                </div>
                <div className="result-card">
                  <h3>Recommended Treatment</h3>
                  <p>{response.Treatment_Plan || '-'}</p>
                </div>
              </div>
            )}
            {!response && (
              <div className="empty-state">
                <FontAwesomeIcon icon={faMicroscope} size="4x" />
                <h3>No Analysis Yet</h3>
                <p>Submit patient data to get diagnosis results</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
