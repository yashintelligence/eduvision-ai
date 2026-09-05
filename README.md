# 🎓 EduVision AI 2.0 (એડ્યુવિઝન એઆઈ)

> **વિદ્યાર્થી પ્રગતિ માટે બુદ્ધિશાળી આગાહી અને વ્યક્તિગત માર્ગદર્શન પ્રણાલી**  
> *Production-Ready AI-Powered Student Academic Performance Prediction & Personalized Guidance Platform*

---
Live Website - https://eduvision-ai-kappa.vercel.app/
---

## 📖 પ્રોજેક્ટ પરિચય (Project Overview)

**EduVision AI 2.0** એ અદ્યતન મશીન લર્નિંગ (Machine Learning) ટેકનોલોજી આધારિત શૈક્ષણિક વિશ્લેષણ પ્લેટફોર્મ છે. આ સિસ્ટમ વિદ્યાર્થીના શૈક્ષણિક પરિણામો, અભ્યાસના કલાકો, વર્ગખંડની હાજરી, પરીક્ષા ઇતિહાસ અને જીવનશૈલી પરિબળોનું વિશ્લેષણ કરીને તેમના અંતિમ ગુણની સચોટ આગાહી કરે છે, જોખમ સ્તર નક્કી કરે છે અને વ્યક્તિગત શૈક્ષણિક ભલામણો આપે છે.

મૂળ Streamlit પ્રોટોટાઇપને **Next.js (React + TypeScript + Tailwind CSS)** અને **FastAPI (Python 3)** આધારિત મોડર્ન, રિસ્પોન્સિવ, પ્રોડક્શન-રેડી વેબ એપ્લિકેશનમાં રૂપાંતરિત કરવામાં આવ્યું છે. સમગ્ર યુઝર ઇન્ટરફેસ (UI) અને સામગ્રી કુદરતી **ગુજરાતી ભાષા** માં ડિઝાઇન કરાયેલ છે.

---

## 🏫 સંસ્થા અને માર્ગદર્શન વિગતો (Institutional Details)

* **શાળાનું નામ:** એમ. એમ. કરોડિયા પ્રાથમિક શાળા, તરસાડી કોસંબા (R.S)
* **પ્રોજેક્ટ માર્ગદર્શક:** શ્રી મનોજભાઈ પરમાર
* **પ્રોજેક્ટ ડેવલપર:** યશ પટેલ (Yash Patel), B.Sc. Information Technology, Department of ICT, Veer Narmad South Gujarat University (VNSGU), સુરત.

---

## 🏛️ સિસ્ટમ આર્કિટેક્ચર (System Architecture)

```text
               +-------------------------------------------------------+
               |                  Browser / User Client                |
               +-------------------------------------------------------+
                                          |
                                          v  HTTPS / REST
               +-------------------------------------------------------+
               |               Next.js 14 Frontend (Vercel)            |
               |   - React 18, TypeScript, Tailwind CSS                |
               |   - Noto Sans Gujarati Typography                     |
               |   - Glassmorphism Design, SVG Gauge & Bar Visuals     |
               |   - LocalStorage Cache & Offline Graceful Fallback    |
               +-------------------------------------------------------+
                                          |
                                          v  REST API (JSON)
               +-------------------------------------------------------+
               |              FastAPI Python Backend (Render/Cloud)    |
               |   - Pydantic Input Validation & Error Handling        |
               |   - CORS Middleware & SQLite History Store            |
               +-------------------------------------------------------+
                                          |
                                          v
               +-------------------------------------------------------+
               |        scikit-learn ColumnTransformer Pipeline        |
               |   - StandardScaler (8 Numerical Features)              |
               |   - OneHotEncoder (4 Categorical Features)            |
               +-------------------------------------------------------+
                                          |
                                          v
               +-------------------------------------------------------+
               |         GradientBoostingRegressor (random_state=42)   |
               |   - R² Score: 0.8138 | MAE: 1.1804                    |
               +-------------------------------------------------------+
                                          |
                                          v
                    Prediction [0-20] & Risk Classification
                                          |
                                          v
                     AI Recommendations & Gujarati Explanations
```

---

## 🧠 મશીન લર્નિંગ મોડેલ અને પદ્ધતિ (ML Methodology)

### ૧. મોડેલ પર્ફોર્મન્સ મેટ્રિક્સ (Evaluation Metrics)
| મોડેલ પ્રકાર (Algorithm) | સરેરાશ નિરપેક્ષ ભૂલ (MAE) | R² સ્કોર (ચોકસાઈ) |
| :--- | :---: | :---: |
| Linear Regression | ૧.૪૪૨૯ | ૦.૭૬૯૦ |
| Random Forest Regressor | ૧.૨૦૬૧ | ૦.૮૧૩૨ |
| **Gradient Boosting Regressor (પસંદ કરેલ)** | **૧.૧૮૦૪** | **૦.૮૧૩૮** |

### ૨. વાસ્તવિક ૧૨ ઇનપુટ પરિમાણો (The 12 Input Features)
1. **G1:** પ્રથમ સત્ર પરીક્ષાના ગુણ (૦ થી ૨૦)
2. **G2:** દ્વિતીય સત્ર પરીક્ષાના ગુણ (૦ થી ૨૦) - *સૌથી મોટો પ્રભાવ (૮૦.૫%)*
3. **studytime:** દૈનિક અભ્યાસનો સમય (૧: <૨ કલાક, ૨: ૨-૫ કલાક, ૩: ૫-૧૦ કલાક, ૪: >૧૦ કલાક)
4. **failures:** અગાઉ નાપાસ થયેલા વિષયોની સંખ્યા (૦ થી ૪)
5. **schoolsup:** શાળા તરફથી વિશેષ શિક્ષણ સહાય (yes/no)
6. **famsup:** પરિવાર તરફથી શૈક્ષણિક સહાય (yes/no)
7. **internet:** ઘરે ઇન્ટરનેટ સુવિધા (yes/no)
8. **higher:** ઉચ્ચ શિક્ષણ મેળવવાની આકાંક્ષા (yes/no)
9. **goout:** મિત્રો સાથે બહાર જવાનો કે મનોરંજન સમય (૧ થી ૫)
10. **freetime:** અભ્યાસ બાદ નવરાશનો ફ્રી સમય (૧ થી ૫)
11. **health:** શારીરિક આરોગ્ય સ્તર (૧ થી ૫)
12. **absences:** શાળામાં ગેરહાજરીના દિવસો (૦ થી ૭૫) - *બીજો મોટો પ્રભાવ (૧૪.૨%)*

### ૩. પરિબળ મહત્વ વિશ્લેષણ (Feature Importances)
* **G2 (દ્વિતીય સત્ર ગુણ):** ૮૦.૫૩%
* **absences (ગેરહાજરી):** ૧૪.૧૭%
* **G1 (પ્રથમ સત્ર ગુણ):** ૧.૬૪%
* **health (આરોગ્ય સ્તર):** ૦.૭૮%
* **schoolsup (શાળા સહાય):** ૧.૧૨%
* **studytime (અભ્યાસ સમય):** ૦.૫૨%
* **failures (નાપાસ વિષયો):** ૦.૪૬%

---

## 🎨 ગુજરાતી યુઝર ઇન્ટરફેસ (Gujarati UI & Typography)

* **ફોન્ટ:** Google Fonts તરફથી `Noto Sans Gujarati` વેબ ફોન્ટ સંપૂર્ણ ઇન્ટરફેસમાં લોડ થાય છે.
* **ડિઝાઇન થીમ:** Dark Glassmorphism, Neon Cyan/Blue/Purple ઉચ્ચારો, સૂક્ષ્મ પડછાયાઓ અને રિસ્પોન્સિવ ગ્રીડ.
* **મુખ્ય ૬ નેવિગેશન વિભાગો:**
  1. **ડેશબોર્ડ:** કુલ વિદ્યાર્થીઓ, સરેરાશ સ્કોર, ઉચ્ચ પ્રદર્શન કરનારા, ધ્યાનની જરૂરિયાત ધરાવતા, હાજરી દર અને અભ્યાસ કલાકો જેવા લાઈવ KPI કાર્ડ્સ.
  2. **પ્રદર્શનની આગાહી:** ઇન્ટરેક્ટિવ સ્લાઇડર્સ, ઇનપુટ વેલિડેશન, ગેજ મીટર, સરખામણી ચાર્ટ અને વિદ્યાર્થી રિપોર્ટ.
  3. **વિદ્યાર્થી વિશ્લેષણ:** અભ્યાસ સમય vs ગુણ, ગેરહાજરી vs ગુણ અને પરિબળ પ્રભાવ આલેખો.
  4. **આગાહીનો ઇતિહાસ:** શોધ (Search), ફિલ્ટર, સોર્ટિંગ, પૃષ્ઠ ક્રમાંકન (Pagination) અને વિગતવાર મોડલ.
  5. **આંતરદૃષ્ટિ:** ML કાર્યપદ્ધતિ, જોખમ શ્રેણી માળખું અને શિક્ષક-વાલી માર્ગદર્શિકા.
  6. **EduVision AI વિશે:** શાળા, માર્ગદર્શક શિક્ષક, ડેવલપર અને પ્રોજેક્ટ વિઝન.

---

## 📁 પ્રોજેક્ટ ફોલ્ડર માળખું (Project Structure)

```text
eduvision-ai/
├── frontend/                     # Next.js 14 Frontend Application
│   ├── app/
│   │   ├── globals.css           # Tailwind CSS & Glassmorphic Custom Styles
│   │   ├── layout.tsx            # Noto Sans Gujarati Font & Root HTML Setup
│   │   └── page.tsx              # Single Page Application Tab Orchestrator
│   ├── components/
│   │   ├── Navbar.tsx            # Gujarati Header & Navigation Drawer
│   │   ├── DashboardTab.tsx      # KPI Dashboard & Distribution Chart
│   │   ├── PredictionTab.tsx     # 12-Feature Prediction Form & Results
│   │   ├── AnalyticsTab.tsx      # Interactive Research Data Visualizations
│   │   ├── HistoryTab.tsx        # Filterable & Searchable History Table
│   │   ├── InsightsTab.tsx       # Scientific Insights & Risk Matrix
│   │   ├── AboutTab.tsx          # Institutional & Mentor Information
│   │   ├── GaugeChart.tsx        # Pure SVG Responsive Radial Gauge
│   │   ├── ComparisonChart.tsx   # G1, G2, Predicted Score Bar Comparison
│   │   └── CelebrationEffect.tsx # Canvas Particle Confetti
│   ├── lib/
│   │   ├── api.ts                # Type-Safe REST API Client with Offline Fallback
│   │   ├── gujarati.ts           # Gujarati Content, Labels & Color Palettes
│   │   └── storage.ts            # LocalStorage Caching Utility
│   ├── types/
│   │   └── index.ts              # TypeScript Domain Interfaces
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── backend/                      # FastAPI Python Backend
│   ├── app/
│   │   ├── api/
│   │   │   └── routes.py         # /predict, /health, /analytics, /predictions, /model-info
│   │   ├── models/
│   │   │   └── schemas.py        # Pydantic Schemas with Gujarati Field Docs
│   │   ├── services/
│   │   │   ├── predictor.py      # ML Pipeline Loader & Clamped Inference
│   │   │   ├── explainer.py      # Actual Feature Importance & Contribution Logic
│   │   │   ├── recommender.py    # Rule-Based Educational Recommendations
│   │   │   ├── analytics.py      # Statistical Aggregations from Dataset
│   │   │   └── storage.py        # SQLite Persistence for Prediction History
│   │   ├── config.py             # App Settings & CORS Config
│   │   └── main.py               # FastAPI Entrypoint
│   ├── model/
│   │   ├── eduvision_model.pkl   # Trained GradientBoosting Pipeline (143 KB)
│   │   └── feature_columns.pkl   # Feature Names Ordering
│   ├── tests/
│   │   ├── test_model.py         # Model Parity & Boundary Unit Tests
│   │   └── test_api.py           # API Endpoints Integration Tests
│   ├── Dockerfile                # Production Container Definition
│   ├── requirements.txt
│   └── run.py
│
├── data/
│   └── student-mat.csv           # 395-Student Math Academic Dataset
│
├── .env.example                  # Environment Variables Example
├── .gitignore
└── README.md
```

---

## ⚡ સ્થાનિક સેટઅપ (Local Installation & Setup)

### ૧. બેકએન્ડ સેટઅપ (FastAPI Backend)

```bash
cd backend

# વર્ચ્યુઅલ એન્વાયર્નમેન્ટ બનાવો (વૈકલ્પિક)
python3 -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# ડિપેન્ડન્સી ઇન્સ્ટોલ કરો
pip install -r requirements.txt

# ટેસ્ટ ચલાવો (તમામ ૯ ટેસ્ટ પાસ થવા જોઈએ)
pytest tests/ -v

# સર્વર શરૂ કરો
python3 run.py
```
બેકએન્ડ `http://127.0.0.1:8000` પર શરૂ થશે.  
ઇન્ટરેક્ટિવ Swagger API દસ્તાવેજીકરણ: `http://127.0.0.1:8000/docs`.

### ૨. ફ્રન્ટએન્ડ સેટઅપ (Next.js Frontend)

```bash
cd frontend

# પેકેજો ઇન્સ્ટોલ કરો
npm install

# ડેવલપમેન્ટ સર્વર શરૂ કરો
npm run dev
```
બ્રાઉઝરમાં `http://localhost:3000` ખોલો.

---

## 🚀 ડિપ્લોયમેન્ટ માર્ગદર્શિકા (Deployment Guide)

### ૧. Vercel પર ફ્રન્ટએન્ડ ડિપ્લોય કરવું (Frontend on Vercel)
1. GitHub પર આ રિપોઝીટરી પુશ કરો.
2. [Vercel](https://vercel.com) પર નવો પ્રોજેક્ટ ઉમેરો અને `Root Directory` તરીકે `frontend` પસંદ કરો.
3. Environment Variable ઉમેરો:
   * `NEXT_PUBLIC_API_URL`: તમારા ડિપ્લોય કરેલા બેકએન્ડનો URL (દા.ત. `https://eduvision-backend.onrender.com`).
4. **Deploy** પર ક્લિક કરો.

### ૨. Render / Railway / Fly.io પર બેકએન્ડ ડિપ્લોય કરવું (Backend Deployment)
1. Render પર **New Web Service** બનાવો.
2. `Root Directory` તરીકે `backend` પસંદ કરો.
3. Runtime: **Python 3** (અથવા Docker).
4. Build Command: `pip install -r requirements.txt`.
5. Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
6. Environment Variables ઉમેરો:
   * `CORS_ORIGINS`: તમારા Vercel ડોમેનનો URL (દા.ત. `https://eduvision-ai.vercel.app`).

---

## 📡 API દસ્તાવેજીકરણ (API Documentation)

### `GET /api/health`
સિસ્ટમ સ્થિતિ અને મોડેલ લોડ સ્થિતિ તપાસે છે.
```json
{
  "status": "healthy",
  "service": "EduVision AI Backend",
  "model_loaded": true,
  "features_count": 12
}
```

### `POST /api/predict`
વિદ્યાર્થીના ૧૨ ઇનપુટ્સ પરથી આગાહી, જોખમ સ્તર, યોગદાન પરિબળો અને ભલામણો પરત કરે છે.
```json
{
  "student_name": "પ્રિયા પટેલ",
  "standard": "8",
  "G1": 16,
  "G2": 17,
  "studytime": 3,
  "failures": 0,
  "schoolsup": "no",
  "famsup": "yes",
  "internet": "yes",
  "higher": "yes",
  "goout": 2,
  "freetime": 2,
  "health": 5,
  "absences": 2
}
```
**રિસ્પોન્સ:**
```json
{
  "id": "EV-A1B2C3",
  "predicted_score": 17.81,
  "percentage": 89.0,
  "risk_level": "excellent",
  "risk_label_gu": "🟢 ઉત્તમ",
  "risk_status_gu": "ઉચ્ચ પ્રદર્શન",
  "risk_tone_gu": "વિદ્યાર્થીનું શૈક્ષણિક પ્રદર્શન ઉત્તમ છે...",
  "recommendations": [...],
  "factors": [...]
}
```

### `GET /api/analytics`
વાસ્તવિક ડેટાસેટ આધારિત શૈક્ષણિક વિશ્લેષણ, ગુણ વિતરણ અને સંબંધો પરત કરે છે.

### `GET /api/predictions`
ઇતિહાસ રેકોર્ડ્સ, શોધ અને ફિલ્ટરિંગ સાથે.

---

## 🔮 ભવિષ્યના સુધારાઓ (Future Enhancements)

* [ ] બહુભાષી વિકલ્પ (ગુજરાતી, હિન્દી, અંગ્રેજી ભાષા પસંદગી સ્વિચર).
* [ ] વિદ્યાર્થી માટે પીડીએફ (PDF) રિપોર્ટ ડાઉનલોડ ફંક્શન.
* [ ] શાળાઓ માટે સુપરબેઝ (Supabase) / PostgreSQL કલાઉડ ડેટાબેઝ ઇન્ટિગ્રેશન.
* [ ] શિક્ષકો માટે બલ્ક CSV અપલોડ (એક સાથે સમગ્ર વર્ગખંડનું વિશ્લેષણ).

---

## 📜 લાયસન્સ (License)

આ પ્રોજેક્ટ શૈક્ષણિક હેતુ, વિજ્ઞાન મેળો અને વિદ્યાર્થી માર્ગદર્શન માટે વિકસાવવામાં આવેલ છે.
