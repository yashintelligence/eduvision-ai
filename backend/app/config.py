import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
PROJECT_ROOT = BASE_DIR.parent

MODEL_PATH = Path(os.getenv("MODEL_PATH", str(BASE_DIR / "model" / "eduvision_model.pkl")))
FEATURE_COLUMNS_PATH = Path(os.getenv("FEATURE_COLUMNS_PATH", str(BASE_DIR / "model" / "feature_columns.pkl")))
DATASET_PATH = Path(os.getenv("DATASET_PATH", str(PROJECT_ROOT / "data" / "student-mat.csv")))
DB_PATH = Path(os.getenv("DB_PATH", str(BASE_DIR / "predictions.db")))

PROJECT_NAME = "EduVision AI"
API_V1_STR = "/api"

SCHOOL_NAME = "એમ. એમ. કરોડિયા પ્રાથમિક શાળા, તરસાડી કોસંબા (R.S)"
MENTOR_NAME = "મનોજભાઈ પરમાર"
SUBTITLE = "AI આધારિત વિદ્યાર્થી પ્રદર્શન આગાહી અને વ્યક્તિગત માર્ગદર્શન પ્રણાલી"

CORS_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000,http://localhost:8000,http://127.0.0.1:8000,https://*.vercel.app",
    ).split(",")
    if origin.strip()
]
