import warnings
from typing import Dict, Any, Tuple
import joblib
import pandas as pd
from app.config import MODEL_PATH, FEATURE_COLUMNS_PATH

# Suppress sklearn unpickling warnings
warnings.filterwarnings("ignore")

_model = None
_feature_columns = None

def get_model():
    global _model
    if _model is None:
        if not MODEL_PATH.exists():
            raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
        _model = joblib.load(MODEL_PATH)
    return _model

def get_feature_columns() -> list[str]:
    global _feature_columns
    if _feature_columns is None:
        if not FEATURE_COLUMNS_PATH.exists():
            raise FileNotFoundError(f"Feature columns file not found at {FEATURE_COLUMNS_PATH}")
        _feature_columns = joblib.load(FEATURE_COLUMNS_PATH)
    return _feature_columns

def get_risk_info(score: float) -> Dict[str, str]:
    if score < 8:
        return {
            "level": "high",
            "label_gu": "🔴 ઉચ્ચ જોખમ",
            "status_gu": "તાત્કાલિક શૈક્ષણિક સહાય જરૂરી",
            "risk_class": "risk-high",
            "tone_gu": "વિદ્યાર્થીને નિયમિત અભ્યાસ આયોજન, હાજરીમાં સુધારો અને મૂળભૂત વિષયોમાં વધારાના માર્ગદર્શનની જરૂર છે.",
            "color": "#ef4444",
        }
    elif score < 12:
        return {
            "level": "moderate",
            "label_gu": "🟠 મધ્યમ જોખમ",
            "status_gu": "સુધારાની સારી તક",
            "risk_class": "risk-mid",
            "tone_gu": "નિયમિત અભ્યાસ, યોગ્ય પુનરાવર્તન અને શિક્ષકના માર્ગદર્શન દ્વારા ગુણમાં નોંધપાત્ર સુધારો શક્ય છે.",
            "color": "#f97316",
        }
    elif score < 16:
        return {
            "level": "good",
            "label_gu": "🔵 સારું",
            "status_gu": "સ્થિર પ્રદર્શન",
            "risk_class": "risk-good",
            "tone_gu": "વિદ્યાર્થીનું પ્રદર્શન સારું છે. હવે સતત અભ્યાસ, સમયસર પુનરાવર્તન અને નબળા મુદ્દાઓ પર વધુ ધ્યાન આપવું જોઈએ.",
            "color": "#3b82f6",
        }
    else:
        return {
            "level": "excellent",
            "label_gu": "🟢 ઉત્તમ",
            "status_gu": "ઉચ્ચ પ્રદર્શન",
            "risk_class": "risk-excellent",
            "tone_gu": "વિદ્યાર્થીનું શૈક્ષણિક પ્રદર્શન ઉત્તમ છે. સતતતા જાળવી રાખીને વધુ ઊંચા લક્ષ્યો તરફ આગળ વધવું લાભદાયક રહેશે.",
            "color": "#10b981",
        }

def predict_score(values: Dict[str, Any]) -> Tuple[float, float, Dict[str, str]]:
    model = get_model()
    columns = get_feature_columns()
    
    # Ensure correct column ordering
    input_row = {col: values[col] for col in columns}
    input_df = pd.DataFrame([input_row])
    
    raw_prediction = model.predict(input_df)[0]
    # Clamp score between 0 and 20 exactly as original prototype
    clamped_score = round(float(max(0.0, min(20.0, raw_prediction))), 2)
    percentage = round(clamped_score * 5.0, 1)
    risk_info = get_risk_info(clamped_score)
    
    return clamped_score, percentage, risk_info
