import pytest
import joblib
import pandas as pd
from app.config import MODEL_PATH, FEATURE_COLUMNS_PATH
from app.services.predictor import predict_score, get_risk_info

def test_model_files_exist():
    assert MODEL_PATH.exists(), f"Model file missing at {MODEL_PATH}"
    assert FEATURE_COLUMNS_PATH.exists(), f"Feature columns file missing at {FEATURE_COLUMNS_PATH}"

def test_prediction_parity_with_original_logic():
    model = joblib.load(MODEL_PATH)
    feature_cols = joblib.load(FEATURE_COLUMNS_PATH)
    
    test_sample = {
        "G1": 10,
        "G2": 11,
        "studytime": 2,
        "failures": 0,
        "schoolsup": "yes",
        "famsup": "yes",
        "internet": "yes",
        "higher": "yes",
        "goout": 3,
        "freetime": 3,
        "health": 3,
        "absences": 5,
    }
    
    # Original logic calculation
    input_df = pd.DataFrame([{col: test_sample[col] for col in feature_cols}])
    raw_pred = model.predict(input_df)[0]
    expected_score = round(float(max(0, min(20, raw_pred))), 2)
    expected_percentage = round(expected_score * 5.0, 1)
    
    # New backend service calculation
    score, percentage, risk = predict_score(test_sample)
    
    assert score == expected_score
    assert percentage == expected_percentage
    assert risk["level"] == "moderate"
    assert "મધ્યમ જોખમ" in risk["label_gu"]

def test_boundary_clamping():
    # Test high performer
    high_sample = {
        "G1": 20,
        "G2": 20,
        "studytime": 4,
        "failures": 0,
        "schoolsup": "no",
        "famsup": "yes",
        "internet": "yes",
        "higher": "yes",
        "goout": 1,
        "freetime": 2,
        "health": 5,
        "absences": 0,
    }
    score, pct, risk = predict_score(high_sample)
    assert 0 <= score <= 20
    assert 0 <= pct <= 100
    assert risk["level"] == "excellent"
    assert "ઉત્તમ" in risk["label_gu"]
