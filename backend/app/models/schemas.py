from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

class PredictionInput(BaseModel):
    student_name: Optional[str] = Field(default="", description="વિદ્યાર્થીનું નામ")
    standard: Optional[str] = Field(default="8", description="ધોરણ / વર્ગ")
    G1: int = Field(..., ge=0, le=20, description="પ્રથમ પરીક્ષાના ગુણ (0-20)")
    G2: int = Field(..., ge=0, le=20, description="દ્વિતીય પરીક્ષાના ગુણ (0-20)")
    studytime: int = Field(..., ge=1, le=4, description="અભ્યાસનો સમય (1: <2h, 2: 2-5h, 3: 5-10h, 4: >10h)")
    failures: int = Field(..., ge=0, le=4, description="પહેલાં નાપાસ થયેલા વિષયો (0-4)")
    schoolsup: str = Field(..., pattern="^(yes|no)$", description="શાળાની સહાય (yes/no)")
    famsup: str = Field(..., pattern="^(yes|no)$", description="પરિવારની સહાય (yes/no)")
    internet: str = Field(..., pattern="^(yes|no)$", description="ઇન્ટરનેટ સુવિધા (yes/no)")
    higher: str = Field(..., pattern="^(yes|no)$", description="ઉચ્ચ અભ્યાસની ઇચ્છા (yes/no)")
    goout: int = Field(..., ge=1, le=5, description="બહાર જવાનો સમય (1-5)")
    freetime: int = Field(..., ge=1, le=5, description="નવરાશનો સમય (1-5)")
    health: int = Field(..., ge=1, le=5, description="આરોગ્ય સ્તર (1-5)")
    absences: int = Field(..., ge=0, le=75, description="ગેરહાજરીના દિવસો (0-75)")

class RecommendationItem(BaseModel):
    title: str
    detail: str
    category: str = "general"

class FeatureFactor(BaseModel):
    feature: str
    feature_name_gu: str
    value: Any
    importance_pct: float
    status: str # 'strength', 'neutral', 'attention'
    description_gu: str

class PredictionResponse(BaseModel):
    id: str
    student_name: str
    standard: str
    predicted_score: float
    percentage: float
    risk_level: str
    risk_label_gu: str
    risk_status_gu: str
    risk_tone_gu: str
    risk_class: str
    inputs: Dict[str, Any]
    recommendations: List[RecommendationItem]
    factors: List[FeatureFactor]
    model_version: str
    created_at: str

class HistoryListResponse(BaseModel):
    total: int
    page: int
    page_size: int
    items: List[PredictionResponse]

class ModelInfoResponse(BaseModel):
    model_name: str
    algorithm: str
    r2_score: float
    mae: float
    features: List[str]
    feature_importances: List[Dict[str, Any]]
    school_name: str
    mentor_name: str
    subtitle: str

class DistributionBin(BaseModel):
    range_label: str
    count: int
    percentage: float

class GroupAverage(BaseModel):
    category: str
    avg_score: float
    count: int

class AnalyticsResponse(BaseModel):
    total_students: int
    average_score: float
    pass_rate: float
    high_performers_count: int
    needing_attention_count: int
    average_attendance_rate: float
    average_study_hours: float
    score_distribution: List[DistributionBin]
    study_time_vs_score: List[GroupAverage]
    absences_vs_score: List[GroupAverage]
    recent_predictions: List[PredictionResponse]
