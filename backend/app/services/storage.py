import json
import sqlite3
import uuid
from datetime import datetime
from typing import List, Optional, Tuple, Dict, Any
from app.config import DB_PATH

def get_db():
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    # Auto ensure table exists
    conn.execute("""
        CREATE TABLE IF NOT EXISTS predictions (
            id TEXT PRIMARY KEY,
            student_name TEXT,
            standard TEXT,
            predicted_score REAL,
            percentage REAL,
            risk_level TEXT,
            risk_label_gu TEXT,
            risk_status_gu TEXT,
            risk_tone_gu TEXT,
            risk_class TEXT,
            inputs_json TEXT,
            recommendations_json TEXT,
            factors_json TEXT,
            model_version TEXT,
            created_at TEXT
        )
    """)
    conn.commit()
    return conn

def init_db():
    conn = get_db()
    with conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS predictions (
                id TEXT PRIMARY KEY,
                student_name TEXT,
                standard TEXT,
                predicted_score REAL,
                percentage REAL,
                risk_level TEXT,
                risk_label_gu TEXT,
                risk_status_gu TEXT,
                risk_tone_gu TEXT,
                risk_class TEXT,
                inputs_json TEXT,
                recommendations_json TEXT,
                factors_json TEXT,
                model_version TEXT,
                created_at TEXT
            )
        """)
        conn.execute("CREATE INDEX IF NOT EXISTS idx_created_at ON predictions (created_at DESC)")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_risk_level ON predictions (risk_level)")
    conn.close()

def save_prediction_record(data: Dict[str, Any]) -> str:
    record_id = data.get("id") or str(uuid.uuid4())[:8]
    created_at = data.get("created_at") or datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    conn = get_db()
    with conn:
        conn.execute("""
            INSERT OR REPLACE INTO predictions (
                id, student_name, standard, predicted_score, percentage,
                risk_level, risk_label_gu, risk_status_gu, risk_tone_gu, risk_class,
                inputs_json, recommendations_json, factors_json, model_version, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            record_id,
            data["student_name"],
            data["standard"],
            data["predicted_score"],
            data["percentage"],
            data["risk_level"],
            data["risk_label_gu"],
            data["risk_status_gu"],
            data["risk_tone_gu"],
            data["risk_class"],
            json.dumps(data["inputs"], ensure_ascii=False),
            json.dumps([r.model_dump() if hasattr(r, 'model_dump') else r for r in data["recommendations"]], ensure_ascii=False),
            json.dumps([f.model_dump() if hasattr(f, 'model_dump') else f for f in data["factors"]], ensure_ascii=False),
            data.get("model_version", "1.0.0"),
            created_at,
        ))
    conn.close()
    return record_id

def list_predictions(
    search: Optional[str] = None,
    risk_level: Optional[str] = None,
    page: int = 1,
    page_size: int = 10,
    sort_order: str = "desc"
) -> Tuple[int, List[Dict[str, Any]]]:
    conn = get_db()
    query = "SELECT * FROM predictions WHERE 1=1"
    params = []
    
    if search:
        query += " AND (student_name LIKE ? OR standard LIKE ?)"
        term = f"%{search.strip()}%"
        params.extend([term, term])
        
    if risk_level and risk_level != "all":
        query += " AND risk_level = ?"
        params.append(risk_level)
        
    count_query = f"SELECT COUNT(*) FROM ({query})"
    cur = conn.cursor()
    cur.execute(count_query, params)
    total = cur.fetchone()[0]
    
    order = "DESC" if sort_order.lower() == "desc" else "ASC"
    query += f" ORDER BY created_at {order} LIMIT ? OFFSET ?"
    offset = (max(1, page) - 1) * page_size
    params.extend([page_size, offset])
    
    cur.execute(query, params)
    rows = cur.fetchall()
    
    items = []
    for r in rows:
        items.append({
            "id": r["id"],
            "student_name": r["student_name"],
            "standard": r["standard"],
            "predicted_score": r["predicted_score"],
            "percentage": r["percentage"],
            "risk_level": r["risk_level"],
            "risk_label_gu": r["risk_label_gu"],
            "risk_status_gu": r["risk_status_gu"],
            "risk_tone_gu": r["risk_tone_gu"],
            "risk_class": r["risk_class"],
            "inputs": json.loads(r["inputs_json"]),
            "recommendations": json.loads(r["recommendations_json"]),
            "factors": json.loads(r["factors_json"]),
            "model_version": r["model_version"],
            "created_at": r["created_at"],
        })
    conn.close()
    return total, items
