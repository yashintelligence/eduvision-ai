import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    res = client.get("/api/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "healthy"
    assert data["model_loaded"] is True
    assert data["features_count"] == 12

def test_predict_success():
    payload = {
        "student_name": "યશ પરીખ",
        "standard": "8",
        "G1": 15,
        "G2": 16,
        "studytime": 3,
        "failures": 0,
        "schoolsup": "no",
        "famsup": "yes",
        "internet": "yes",
        "higher": "yes",
        "goout": 2,
        "freetime": 2,
        "health": 4,
        "absences": 2,
    }
    res = client.post("/api/predict", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert "predicted_score" in data
    assert 0 <= data["predicted_score"] <= 20
    assert "recommendations" in data
    assert len(data["recommendations"]) > 0
    assert "factors" in data
    assert len(data["factors"]) > 0
    assert data["student_name"] == "યશ પરીખ"

def test_predict_validation_error():
    # G1 > 20 is invalid
    payload = {
        "student_name": "ટેસ્ટ",
        "standard": "8",
        "G1": 25, # Out of range
        "G2": 10,
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
    res = client.post("/api/predict", json=payload)
    assert res.status_code == 422

def test_analytics():
    res = client.get("/api/analytics")
    assert res.status_code == 200
    data = res.json()
    assert data["total_students"] >= 395
    assert "average_score" in data
    assert "score_distribution" in data
    assert len(data["score_distribution"]) > 0

def test_model_info():
    res = client.get("/api/model-info")
    assert res.status_code == 200
    data = res.json()
    assert data["r2_score"] == 0.8138
    assert data["mae"] == 1.1804
    assert len(data["features"]) == 12
    assert len(data["feature_importances"]) == 12

def test_predictions_history():
    res = client.get("/api/predictions?page=1&page_size=10")
    assert res.status_code == 200
    data = res.json()
    assert "total" in data
    assert "items" in data
