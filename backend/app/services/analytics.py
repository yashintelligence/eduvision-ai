from pathlib import Path
from typing import Dict, Any, List
import pandas as pd
from app.config import DATASET_PATH
from app.services.storage import list_predictions

def compute_dataset_analytics() -> Dict[str, Any]:
    if not DATASET_PATH.exists():
        raise FileNotFoundError(f"Dataset not found at {DATASET_PATH}")
        
    df = pd.read_csv(DATASET_PATH, sep=";")
    
    # G3 is final exam score out of 20
    total_students = len(df)
    avg_score = round(float(df["G3"].mean()), 2)
    pass_count = int((df["G3"] >= 10).sum())
    pass_rate = round(float((pass_count / total_students) * 100), 1)
    
    high_performers = int((df["G3"] >= 16).sum())
    needing_attention = int((df["G3"] < 8).sum())
    
    # Average study time in dataset:
    # 1: <2h (approx 1h), 2: 2-5h (approx 3.5h), 3: 5-10h (approx 7.5h), 4: >10h (approx 12h)
    study_hours_map = {1: 1.5, 2: 3.5, 3: 7.5, 4: 12.0}
    avg_study_hours = round(float(df["studytime"].map(study_hours_map).mean()), 1)
    
    # Average attendance percentage: absences out of theoretical 90 school days
    avg_absences = df["absences"].mean()
    avg_attendance_rate = round(float(max(0, min(100, 100 - (avg_absences / 93.0 * 100)))), 1)
    
    # Score distribution bins
    bins = [
        ("0-7 (ઉચ્ચ જોખમ)", 0, 8),
        ("8-11 (મધ્યમ જોખમ)", 8, 12),
        ("12-15 (સારું પ્રદર્શન)", 12, 16),
        ("16-20 (ઉત્તમ પ્રદર્શન)", 16, 21),
    ]
    distribution = []
    for label, low, high in bins:
        count = int(((df["G3"] >= low) & (df["G3"] < high)).sum())
        pct = round((count / total_students) * 100, 1)
        distribution.append({
            "range_label": label,
            "count": count,
            "percentage": pct
        })
        
    # Study time vs score
    study_labels = {1: "< 2 કલાક", 2: "2-5 કલાક", 3: "5-10 કલાક", 4: "> 10 કલાક"}
    study_grouped = df.groupby("studytime")["G3"].agg(["mean", "count"]).reset_index()
    study_vs_score = []
    for _, row in study_grouped.iterrows():
        study_vs_score.append({
            "category": study_labels.get(int(row["studytime"]), f"{int(row['studytime'])}"),
            "avg_score": round(float(row["mean"]), 2),
            "count": int(row["count"])
        })
        
    # Absences vs score
    df["abs_group"] = pd.cut(
        df["absences"],
        bins=[-1, 4, 10, 20, 100],
        labels=["0-4 દિવસ", "5-10 દિવસ", "11-20 દિવસ", "20+ દિવસ"]
    )
    abs_grouped = df.groupby("abs_group", observed=False)["G3"].agg(["mean", "count"]).reset_index()
    absences_vs_score = []
    for _, row in abs_grouped.iterrows():
        absences_vs_score.append({
            "category": str(row["abs_group"]),
            "avg_score": round(float(row["mean"]), 2) if not pd.isna(row["mean"]) else 0.0,
            "count": int(row["count"]) if not pd.isna(row["count"]) else 0
        })

    # Recent predictions from storage
    _, recent_items = list_predictions(page=1, page_size=5)
    
    return {
        "total_students": total_students,
        "average_score": avg_score,
        "pass_rate": pass_rate,
        "high_performers_count": high_performers,
        "needing_attention_count": needing_attention,
        "average_attendance_rate": avg_attendance_rate,
        "average_study_hours": avg_study_hours,
        "score_distribution": distribution,
        "study_time_vs_score": study_vs_score,
        "absences_vs_score": absences_vs_score,
        "recent_predictions": recent_items
    }
