# 🎓 EduVision AI

### Predict Today, Improve Tomorrow

> **કૃત્રિમ બુદ્ધિ આધારિત વિદ્યાર્થી પ્રદર્શન આગાહી અને વ્યક્તિગત માર્ગદર્શન પ્રણાલી**

---

## 📖 Project Overview

**EduVision AI** is an Artificial Intelligence-based educational analytics platform developed to predict student academic performance and provide personalized guidance through a fully Gujarati dashboard.

The system uses Machine Learning to analyze academic, behavioral, lifestyle, and support-related factors to estimate a student's final academic performance and generate meaningful recommendations.

---

## 🎯 Project Objectives

* Predict student academic performance.
* Identify students at academic risk.
* Provide personalized recommendations.
* Promote educational awareness.
* Deliver insights through a Gujarati AI dashboard.
* Support teachers and students with data-driven guidance.

---

## 🏫 School Information

**School:** એમ. એમ. કરોડિયા પ્રાથમિક શાળા, તરસાડી, કોસંબા

**Project Mentor:** મનોજભાઈ પરમાર

---

## 🧠 AI Features

✅ Student Performance Prediction

✅ Academic Risk Analysis

✅ Gujarati Dashboard

✅ Personalized Recommendations

✅ Educational Support Analysis

✅ Lifestyle Analysis

✅ Student Guidance System

---

## 📊 Machine Learning Model

| Model             |        MAE |   R² Score |
| ----------------- | ---------: | ---------: |
| Linear Regression |     1.4429 |     0.7690 |
| Random Forest     |     1.2061 |     0.8132 |
| Gradient Boosting | **1.1804** | **0.8138** |

### Final Selected Model

**Gradient Boosting Regressor**

---

## ⚙️ Model Pipeline

* ColumnTransformer
* StandardScaler
* OneHotEncoder
* Scikit-learn Pipeline
* Gradient Boosting Regressor

---

## 📥 Input Features

* Previous Exam Score (G1)
* Previous Exam Score (G2)
* Study Time
* Previous Failures
* School Support
* Family Support
* Internet Access
* Higher Education Aspiration
* Social Activities
* Free Time
* Health Status
* Absences

---

## 📈 Model Performance

* **R² Score:** 0.8138
* **MAE:** 1.1804

The model explains approximately **81% of the variation in student academic performance**.

---

## 🖥️ Gujarati Dashboard Features

* Modern Gujarati Interface
* Academic Prediction
* Risk Classification
* Personalized Recommendations
* Performance Indicators
* Progress Visualization
* Student Report Generation

---

## 📂 Project Structure

```text
EduVision-AI/
│
├── streamlit_app.py
├── eduvision_model.pkl
├── feature_columns.pkl
├── requirements.txt
├── notebooks/
│   └── ML_Model_Development.ipynb
│
└── README.md
```

---

## 🚀 Installation

```bash
git clone <repository-url>

cd EduVision-AI

pip install -r requirements.txt
```

---

## ▶️ Run Application

```bash
streamlit run streamlit_app.py
```

---

## 🛠️ Technologies Used

* Python
* Pandas
* NumPy
* Scikit-learn
* Streamlit
* Joblib
* Matplotlib
* Seaborn

---

## 🎓 Educational Impact

EduVision AI helps students:

* Understand their academic performance.
* Identify weaknesses.
* Improve study habits.
* Receive personalized guidance.
* Make informed educational decisions.

---

## 🌟 Project Tagline

> **વિદ્યાર્થી પ્રગતિ માટે બુદ્ધિશાળી આગાહી અને માર્ગદર્શન**

---

## 👨‍💻 Developed By

**Yash Patel**

B.Sc. Information Technology Student

Department of ICT

Veer Narmad South Gujarat University

---

## 📜 License

This project was developed for educational and science fair purposes.
