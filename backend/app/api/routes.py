import uuid
from datetime import datetime
from fastapi import APIRouter, HTTPException, Query
from app.models.schemas import (
    PredictionInput,
    PredictionResponse,
    HistoryListResponse,
    ModelInfoResponse,
    AnalyticsResponse,
)
from app.services.predictor import predict_score, get_feature_columns
from app.services.recommender import generate_recommendations
from app.services.explainer import explain_prediction, get_model_feature_importances
from app.services.storage import save_prediction_record, list_predictions
from app.services.analytics import compute_dataset_analytics
from app.config import SCHOOL_NAME, MENTOR_NAME, SUBTITLE

router = APIRouter()

@router.get("/health", tags=["System"])
def health_check():
    cols = get_feature_columns()
    return {
        "status": "healthy",
        "service": "EduVision AI Backend",
        "model_loaded": True,
        "features_count": len(cols),
        "timestamp": datetime.now().isoformat()
    }

@router.post("/predict", response_model=PredictionResponse, tags=["ML Prediction"])
def make_prediction(input_data: PredictionInput):
    try:
        raw_values = input_data.model_dump()
        predicted_score, percentage, risk_info = predict_score(raw_values)
        recommendations = generate_recommendations(raw_values, predicted_score)
        factors = explain_prediction(raw_values)
        
        pred_id = f"EV-{uuid.uuid4().hex[:6].upper()}"
        created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        response_obj = {
            "id": pred_id,
            "student_name": input_data.student_name.strip() or "અનામી વિદ્યાર્થી",
            "standard": input_data.standard,
            "predicted_score": predicted_score,
            "percentage": percentage,
            "risk_level": risk_info["level"],
            "risk_label_gu": risk_info["label_gu"],
            "risk_status_gu": risk_info["status_gu"],
            "risk_tone_gu": risk_info["tone_gu"],
            "risk_class": risk_info["risk_class"],
            "inputs": raw_values,
            "recommendations": recommendations,
            "factors": factors,
            "model_version": "GradientBoosting-v1.0",
            "created_at": created_at
        }
        
        # Persist to local database
        save_prediction_record(response_obj)
        
        return response_obj
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@router.get("/predictions", response_model=HistoryListResponse, tags=["Prediction History"])
def get_history(
    search: str = Query(None, description="નામ અથવા ધોરણ દ્વારા શોધો"),
    risk_level: str = Query("all", description="જોખમ સ્તર ફિલ્ટર"),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    sort_order: str = Query("desc", pattern="^(asc|desc)$")
):
    total, items = list_predictions(
        search=search,
        risk_level=risk_level,
        page=page,
        page_size=page_size,
        sort_order=sort_order
    )
    return {
        "total": total,
        "page": page,
        "page_size": page_size,
        "items": items
    }

@router.get("/analytics", response_model=AnalyticsResponse, tags=["Analytics"])
def get_analytics():
    try:
        return compute_dataset_analytics()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analytics error: {str(e)}")

@router.get("/model-info", response_model=ModelInfoResponse, tags=["Model Info"])
def get_model_information():
    cols = get_feature_columns()
    importances = get_model_feature_importances()
    return {
        "model_name": "EduVision Gradient Boosting Regressor",
        "algorithm": "GradientBoostingRegressor (scikit-learn Pipeline)",
        "r2_score": 0.8138,
        "mae": 1.1804,
        "features": cols,
        "feature_importances": importances,
        "school_name": SCHOOL_NAME,
        "mentor_name": MENTOR_NAME,
        "subtitle": SUBTITLE
    }
