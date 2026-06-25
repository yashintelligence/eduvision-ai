from __future__ import annotations

from pathlib import Path

import joblib
import pandas as pd
import plotly.graph_objects as go
import streamlit as st


APP_DIR = Path(__file__).parent
MODEL_PATH = APP_DIR / "eduvision_model.pkl"
FEATURE_COLUMNS_PATH = APP_DIR / "feature_columns.pkl"

MODEL_R2 = 0.8138
MODEL_MAE = 1.1804
SCHOOL_NAME = "એમ. એમ. કરોડિયા પ્રાથમિક શાળા, તરસાડી કોસંબા (R.S)"
MENTOR_NAME = "મનોજભાઈ પરમાર"
FORMAL_SUBTITLE = "AI આધારિત વિદ્યાર્થી પ્રદર્શન આગાહી અને વ્યક્તિગત માર્ગદર્શન પ્રણાલી"


st.set_page_config(
    page_title="EduVision AI",
    page_icon="🎓",
    layout="wide",
    initial_sidebar_state="expanded",
)


@st.cache_resource(show_spinner=False)
def load_model():
    return joblib.load(MODEL_PATH)


@st.cache_data(show_spinner=False)
def load_feature_columns() -> list[str]:
    return joblib.load(FEATURE_COLUMNS_PATH)


def inject_css() -> None:
    st.markdown(
        """
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Gujarati:wght@400;500;600;700;800&display=swap');

            :root {
                --navy: #061426;
                --navy-2: #0b1f3a;
                --blue: #2563eb;
                --cyan: #38bdf8;
                --purple: #8b5cf6;
                --card: rgba(255, 255, 255, 0.92);
                --muted: #64748b;
                --ink: #0f172a;
            }

            html, body, [class*="css"] {
                font-family: 'Noto Sans Gujarati', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
            }

            .stApp {
                background:
                    radial-gradient(circle at 12% 10%, rgba(56, 189, 248, 0.28), transparent 28%),
                    radial-gradient(circle at 88% 3%, rgba(139, 92, 246, 0.22), transparent 24%),
                    linear-gradient(135deg, #061426 0%, #0b1f3a 42%, #102a57 100%);
                color: #f8fafc;
            }

            section[data-testid="stSidebar"] {
                background: linear-gradient(180deg, rgba(6, 20, 38, 0.98), rgba(15, 23, 42, 0.96));
                border-right: 1px solid rgba(148, 163, 184, 0.22);
            }

            section[data-testid="stSidebar"] * {
                color: #e5eefb;
            }

            .block-container {
                padding-top: 1.4rem;
                padding-bottom: 3rem;
                max-width: 1280px;
            }

            h1, h2, h3 {
                letter-spacing: 0;
            }

            div[data-testid="stTextInput"] input,
            div[data-testid="stNumberInput"] input,
            div[data-baseweb="select"] > div,
            textarea {
                border-radius: 14px;
                border: 1px solid rgba(148, 163, 184, 0.34);
                box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
            }

            div[data-testid="stSlider"] {
                padding-top: 0.3rem;
            }

            .hero {
                position: relative;
                overflow: hidden;
                padding: 2.4rem;
                border: 1px solid rgba(255,255,255,0.18);
                border-radius: 28px;
                background:
                    linear-gradient(135deg, rgba(37, 99, 235, 0.82), rgba(139, 92, 246, 0.62)),
                    linear-gradient(45deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04));
                box-shadow: 0 28px 70px rgba(0, 0, 0, 0.32);
                backdrop-filter: blur(18px);
                animation: riseIn 0.7s ease both;
            }

            .hero:after {
                content: "";
                position: absolute;
                inset: -45% -15% auto auto;
                width: 360px;
                height: 360px;
                border-radius: 999px;
                background: rgba(255, 255, 255, 0.16);
                filter: blur(3px);
            }

            .hero h1 {
                margin: 0;
                font-size: clamp(2.4rem, 5vw, 4.8rem);
                font-weight: 800;
                color: white;
            }

            .hero p {
                max-width: 760px;
                margin: 0.8rem 0 0;
                color: rgba(255,255,255,0.9);
                font-size: 1.25rem;
                line-height: 1.7;
            }

            .hero-badges {
                display: flex;
                flex-wrap: wrap;
                gap: 0.8rem;
                margin-top: 1.5rem;
            }

            .badge {
                border-radius: 999px;
                padding: 0.55rem 0.95rem;
                background: rgba(255,255,255,0.16);
                border: 1px solid rgba(255,255,255,0.22);
                color: white;
                font-weight: 700;
            }

            .glass-card, .metric-card, .report-card, .recommendation-card {
                border: 1px solid rgba(255,255,255,0.58);
                border-radius: 22px;
                background: var(--card);
                color: var(--ink);
                box-shadow: 0 24px 60px rgba(15, 23, 42, 0.20);
                backdrop-filter: blur(18px);
            }

            .glass-card {
                padding: 1.35rem;
                margin: 0.8rem 0 1.05rem;
                animation: riseIn 0.65s ease both;
            }

            .chart-heading {
                margin: 0.75rem 0 0.35rem;
                color: #f8fafc;
                font-size: 1.08rem;
                font-weight: 800;
            }

            .section-title {
                display: flex;
                align-items: center;
                gap: 0.65rem;
                margin: 0 0 0.95rem;
                color: #f8fafc;
                font-size: 1.5rem;
                font-weight: 800;
            }

            .field-note {
                color: #cbd5e1;
                margin-top: -0.2rem;
                margin-bottom: 0.85rem;
            }

            .metric-card {
                padding: 1.45rem;
                min-height: 168px;
                animation: pulseGlow 2.8s ease-in-out infinite;
            }

            .metric-label {
                color: var(--muted);
                font-weight: 700;
                font-size: 0.98rem;
            }

            .metric-value {
                margin-top: 0.3rem;
                font-size: 3.4rem;
                line-height: 1;
                font-weight: 800;
                background: linear-gradient(135deg, var(--blue), var(--purple));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .risk-card {
                padding: 1.35rem;
                border-radius: 22px;
                color: white;
                box-shadow: 0 24px 60px rgba(15, 23, 42, 0.25);
                min-height: 168px;
            }

            .risk-high { background: linear-gradient(135deg, #dc2626, #7f1d1d); }
            .risk-mid { background: linear-gradient(135deg, #f97316, #9a3412); }
            .risk-good { background: linear-gradient(135deg, #2563eb, #1e40af); }
            .risk-excellent { background: linear-gradient(135deg, #16a34a, #166534); }

            .risk-card h3 {
                margin: 0.25rem 0;
                color: white;
                font-size: 2rem;
            }

            .recommendation-card {
                padding: 1rem 1.05rem;
                margin-bottom: 0.8rem;
                border-left: 5px solid var(--blue);
            }

            .recommendation-card strong {
                color: #1d4ed8;
            }

            .report-card {
                padding: 1.4rem;
                line-height: 1.8;
            }

            .report-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
                gap: 0.9rem;
                margin-top: 1rem;
            }

            .report-pill {
                background: linear-gradient(180deg, #f8fafc, #eef2ff);
                border: 1px solid #dbeafe;
                border-radius: 16px;
                padding: 0.9rem;
            }

            .sidebar-card {
                padding: 1rem;
                margin: 0.7rem 0;
                border-radius: 18px;
                background: rgba(255,255,255,0.08);
                border: 1px solid rgba(255,255,255,0.14);
            }

            .stButton > button {
                width: 100%;
                min-height: 3.4rem;
                border: 0;
                border-radius: 18px;
                color: white;
                font-size: 1.08rem;
                font-weight: 800;
                background: linear-gradient(135deg, #2563eb, #8b5cf6);
                box-shadow: 0 18px 36px rgba(37, 99, 235, 0.35);
                transition: transform 0.18s ease, box-shadow 0.18s ease;
            }

            .stButton > button:hover {
                transform: translateY(-2px);
                box-shadow: 0 22px 42px rgba(139, 92, 246, 0.38);
            }

            @keyframes riseIn {
                from { opacity: 0; transform: translateY(16px); }
                to { opacity: 1; transform: translateY(0); }
            }

            @keyframes pulseGlow {
                0%, 100% { box-shadow: 0 24px 60px rgba(37, 99, 235, 0.18); }
                50% { box-shadow: 0 28px 72px rgba(139, 92, 246, 0.28); }
            }
        </style>
        """,
        unsafe_allow_html=True,
    )


def sidebar() -> None:
    with st.sidebar:
        st.markdown("## 🎓 EduVision AI")
        st.markdown(f"**{FORMAL_SUBTITLE}**")
        st.markdown(
            f"""
            <div class="sidebar-card">
                <strong>શાળાનું નામ</strong><br>
                {SCHOOL_NAME}
            </div>
            <div class="sidebar-card">
                <strong>માર્ગદર્શક શિક્ષક</strong><br>
                {MENTOR_NAME}
            </div>
            <div class="sidebar-card">
                <strong>પ્રોજેક્ટ પ્રકાર</strong><br>
                AI આધારિત વિદ્યાર્થી પ્રદર્શન આગાહી અને ભલામણ સિસ્ટમ
            </div>
            <div class="sidebar-card">
                <strong>Domain માહિતી</strong><br>
                Data Science, Machine Learning અને Streamlit આધારિત EdTech પ્રોટોટાઇપ
            </div>
            <div class="sidebar-card">
                <strong>મોડેલ</strong><br>
                Gradient Boosting Regressor Pipeline<br>
                <strong>R² સ્કોર:</strong> 0.8138<br>
                <strong>MAE:</strong> 1.1804
            </div>
            <div class="sidebar-card">
                <strong>Details</strong><br>
                વિદ્યાર્થીઓ અને શિક્ષકો માટે સમજાય તેવી AI ડેશબોર્ડ પ્રેઝન્ટેશન.
            </div>
            """,
            unsafe_allow_html=True,
        )
        st.info("નોંધ: આ આગાહી શૈક્ષણિક માર્ગદર્શન માટે છે. અંતિમ મૂલ્યાંકન માટે શિક્ષકનું માર્ગદર્શન જરૂરી છે.")


def hero() -> None:
    st.markdown(
        f"""
        <div class="hero">
            <h1>🎓 EduVision AI</h1>
            <p>{FORMAL_SUBTITLE}</p>
            <p>વિદ્યાર્થીના શૈક્ષણિક ડેટા પરથી અંતિમ ગુણની આગાહી, જોખમ વિશ્લેષણ અને વ્યક્તિગત અભ્યાસ ભલામણો આપતું વ્યાવસાયિક શૈક્ષણિક AI ડેશબોર્ડ.</p>
            <div class="hero-badges">
                <span class="badge">{SCHOOL_NAME}</span>
                <span class="badge">માર્ગદર્શક: {MENTOR_NAME}</span>
                <span class="badge">AI પ્રિડિક્શન & ગુજરતી ડેશબોર્ડ</span>
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )


def section_title(icon: str, title: str, note: str = "") -> None:
    st.markdown(f'<div class="section-title">{icon} {title}</div>', unsafe_allow_html=True)
    if note:
        st.markdown(f'<div class="field-note">{note}</div>', unsafe_allow_html=True)


def yes_no(label: str, help_text: str | None = None) -> str:
    return st.segmented_control(
        label,
        options=["yes", "no"],
        format_func=lambda value: "હા" if value == "yes" else "ના",
        default="yes",
        help=help_text,
    )


def build_input_frame(values: dict) -> pd.DataFrame:
    feature_columns = load_feature_columns()
    input_df = pd.DataFrame([{column: values[column] for column in feature_columns}])
    return input_df


def predict_score(values: dict) -> float:
    model = load_model()
    prediction = model.predict(build_input_frame(values))[0]
    return round(float(max(0, min(20, prediction))), 2)


def get_risk(score: float) -> dict[str, str]:
    if score < 8:
        return {
            "label": "🔴 ઉચ્ચ જોખમ",
            "status": "તાત્કાલિક શૈક્ષણિક સહાય જરૂરી",
            "class": "risk-high",
            "tone": "વિદ્યાર્થીને નિયમિત અભ્યાસ આયોજન, હાજરીમાં સુધારો અને મૂળભૂત વિષયોમાં વધારાના માર્ગદર્શનની જરૂર છે.",
        }
    if score < 12:
        return {
            "label": "🟠 મધ્યમ જોખમ",
            "status": "સુધારાની સારી તક",
            "class": "risk-mid",
            "tone": "નિયમિત અભ્યાસ, યોગ્ય પુનરાવર્તન અને શિક્ષકના માર્ગદર્શન દ્વારા ગુણમાં નોંધપાત્ર સુધારો શક્ય છે.",
        }
    if score < 16:
        return {
            "label": "🔵 સારું",
            "status": "સ્થિર પ્રદર્શન",
            "class": "risk-good",
            "tone": "વિદ્યાર્થીનું પ્રદર્શન સારું છે. હવે સતત અભ્યાસ, સમયસર પુનરાવર્તન અને નબળા મુદ્દાઓ પર વધુ ધ્યાન આપવું જોઈએ.",
        }
    return {
        "label": "🟢 ઉત્તમ",
        "status": "ઉચ્ચ પ્રદર્શન",
        "class": "risk-excellent",
        "tone": "વિદ્યાર્થીનું શૈક્ષણિક પ્રદર્શન ઉત્તમ છે. સતતતા જાળવી રાખીને વધુ ઊંચા લક્ષ્યો તરફ આગળ વધવું લાભદાયક રહેશે.",
    }


def generate_recommendations(values: dict, score: float) -> list[tuple[str, str]]:
    recommendations: list[tuple[str, str]] = []

    if values["studytime"] <= 1:
        recommendations.append(("અભ્યાસનો સમય વધારો", "દરરોજ નક્કી કરેલા સમયપત્રક મુજબ વાંચન, પુનરાવર્તન અને પ્રશ્નોત્તરીનો અભ્યાસ કરવો."))
    elif values["studytime"] == 2:
        recommendations.append(("અભ્યાસમાં નિયમિતતા જાળવો", "અભ્યાસનો સમય યોગ્ય છે, પરંતુ મુશ્કેલ વિષયો માટે અલગ સમય ફાળવવો."))

    if values["absences"] > 10:
        recommendations.append(("હાજરીમાં સુધારો કરો", "વધુ ગેરહાજરીથી પાઠ્યક્રમની સમજ પર અસર થાય છે, તેથી નિયમિત હાજરી માટે ખાસ ધ્યાન આપવું."))

    if values["failures"] > 0:
        recommendations.append(("નબળા વિષયો પર વિશેષ ધ્યાન આપો", "જે વિષયોમાં મુશ્કેલી હોય તે માટે શિક્ષકના માર્ગદર્શન હેઠળ સુધારાત્મક અભ્યાસ યોજના બનાવવી."))

    if values["health"] <= 2:
        recommendations.append(("આરોગ્યનું ધ્યાન રાખો", "પૂરતી ઊંઘ, પૌષ્ટિક આહાર, પાણી અને ટૂંકા વિરામ અભ્યાસની અસરકારકતા વધારવામાં મદદરૂપ થાય છે."))

    if values["goout"] >= 4:
        recommendations.append(("બહાર જવાની આવર્તન સંતુલિત રાખો", "મિત્રો સાથે સમય વિતાવવો જરૂરી છે, પરંતુ પરીક્ષા અને અભ્યાસ દરમિયાન સમયનું યોગ્ય સંચાલન કરવું."))

    if values["freetime"] >= 4 and score < 16:
        recommendations.append(("ફ્રી સમયનો શૈક્ષણિક ઉપયોગ કરો", "ફ્રી સમયમાં નાના અભ્યાસ સત્રો, વાંચન અથવા પુનરાવર્તનનો સમાવેશ કરવો."))

    if values["schoolsup"] == "no":
        recommendations.append(("શાળાની વધારાની સહાય મેળવો", "શિક્ષક, માર્ગદર્શક અથવા રિમેડિયલ વર્ગ દ્વારા જરૂરી શૈક્ષણિક આધાર મેળવવો."))

    if values["internet"] == "no":
        recommendations.append(("અભ્યાસ સામગ્રીની વ્યવસ્થા કરો", "ઇન્ટરનેટ ઉપલબ્ધ ન હોય તો શાળા લાઇબ્રેરી અથવા શિક્ષક પાસેથી ઑફલાઇન અભ્યાસ સામગ્રી મેળવવી."))

    if not recommendations:
        recommendations.append(("સારી પ્રગતિ જાળવી રાખો", "વિદ્યાર્થીનું પ્રદર્શન સારું છે. નિયમિત અભ્યાસ, હાજરી અને સ્વાસ્થ્ય જાળવી રાખવું."))

    return recommendations[:5]


def gauge_chart(score: float) -> go.Figure:
    percentage = round(score * 5, 1)
    fig = go.Figure(
        go.Indicator(
            mode="gauge+number",
            value=percentage,
            number={"suffix": "%", "font": {"size": 42, "color": "#0f172a", "family": "Arial Black"}},
            title={"text": "શૈક્ષણિક પ્રદર્શન", "font": {"size": 22, "color": "#0f172a"}},
            gauge={
                "axis": {
                    "range": [0, 100],
                    "tickwidth": 2,
                    "tickcolor": "#0f172a",
                    "tickfont": {"size": 15, "color": "#0f172a"},
                },
                "bar": {"color": "#2563eb"},
                "bgcolor": "#ffffff",
                "borderwidth": 2,
                "bordercolor": "#cbd5e1",
                "steps": [
                    {"range": [0, 40], "color": "#fee2e2"},
                    {"range": [40, 60], "color": "#ffedd5"},
                    {"range": [60, 80], "color": "#dbeafe"},
                    {"range": [80, 100], "color": "#dcfce7"},
                ],
                "threshold": {"line": {"color": "#8b5cf6", "width": 4}, "thickness": 0.75, "value": percentage},
            },
        )
    )
    fig.update_layout(
        height=360,
        margin=dict(l=35, r=35, t=70, b=35),
        paper_bgcolor="#ffffff",
        plot_bgcolor="#ffffff",
        font={"family": "Noto Sans Gujarati, Arial, sans-serif", "color": "#0f172a", "size": 16},
    )
    return fig


def comparison_chart(g1: int, g2: int, predicted: float) -> go.Figure:
    fig = go.Figure(
        data=[
            go.Bar(
                x=["G1", "G2", "અનુમાનિત"],
                y=[g1, g2, predicted],
                marker=dict(color=["#0891b2", "#2563eb", "#7c3aed"], line=dict(width=0)),
                text=[g1, g2, predicted],
                texttemplate="%{text}/20",
                textfont=dict(size=18, color="#0f172a"),
                textposition="outside",
                cliponaxis=False,
            )
        ]
    )
    fig.update_layout(
        height=360,
        yaxis=dict(
            range=[0, 22],
            title=dict(text="ગુણ / 20", font=dict(size=17, color="#0f172a")),
            gridcolor="#cbd5e1",
            tickfont=dict(size=15, color="#0f172a"),
            zerolinecolor="#94a3b8",
        ),
        xaxis=dict(
            title=dict(text="મૂલ્યાંકન", font=dict(size=17, color="#0f172a")),
            tickfont=dict(size=16, color="#0f172a"),
        ),
        margin=dict(l=60, r=35, t=45, b=65),
        paper_bgcolor="#ffffff",
        plot_bgcolor="#ffffff",
        font={"family": "Noto Sans Gujarati, Arial, sans-serif", "color": "#0f172a", "size": 16},
        bargap=0.34,
    )
    return fig


def render_results(student_name: str, standard: str, values: dict) -> None:
    score = predict_score(values)
    risk = get_risk(score)
    recommendations = generate_recommendations(values, score)
    percentage = round(score * 5, 1)

    st.markdown("<br>", unsafe_allow_html=True)
    section_title("📊", "AI પરિણામ ડેશબોર્ડ", "મોડેલ દ્વારા અનુમાનિત ગુણ અને જોખમ વિશ્લેષણ.")

    col_metric, col_risk = st.columns([1, 1])
    with col_metric:
        st.markdown(
            f"""
            <div class="metric-card">
                <div class="metric-label">અનુમાનિત અંતિમ ગુણ</div>
                <div class="metric-value">{score}/20</div>
                <div style="color:#475569;font-weight:700;margin-top:.7rem;">Academic Performance: {percentage}%</div>
            </div>
            """,
            unsafe_allow_html=True,
        )

    with col_risk:
        st.markdown(
            f"""
            <div class="risk-card {risk["class"]}">
                <div style="font-weight:800;opacity:.9;">Risk Category</div>
                <h3>{risk["label"]}</h3>
                <div style="font-size:1.08rem;font-weight:700;">{risk["status"]}</div>
                <p style="margin-bottom:0;opacity:.92;">{risk["tone"]}</p>
            </div>
            """,
            unsafe_allow_html=True,
        )

    progress_value = min(100, max(0, int(round(percentage))))
    st.progress(progress_value, text=f"શૈક્ષણિક પ્રદર્શન: {percentage}%")

    chart_col_1, chart_col_2 = st.columns(2)
    with chart_col_1:
        st.markdown('<div class="chart-heading">શૈક્ષણિક પ્રદર્શન ગેજ</div>', unsafe_allow_html=True)
        st.plotly_chart(gauge_chart(score), use_container_width=True)

    with chart_col_2:
        st.markdown('<div class="chart-heading">G1, G2 અને અનુમાનિત ગુણની સરખામણી</div>', unsafe_allow_html=True)
        st.plotly_chart(comparison_chart(values["G1"], values["G2"], score), use_container_width=True)

    section_title("💡", "AI ભલામણો", "વિદ્યાર્થીના ઇનપુટ આધારે વ્યક્તિગત માર્ગદર્શન.")
    rec_cols = st.columns(2)
    for index, (title, detail) in enumerate(recommendations):
        with rec_cols[index % 2]:
            st.markdown(
                f"""
                <div class="recommendation-card">
                    <strong>{title}</strong><br>
                    <span style="color:#475569;">{detail}</span>
                </div>
                """,
                unsafe_allow_html=True,
            )

    section_title("🧠", "Student AI Report", "શિક્ષક અને વિદ્યાર્થી માટે તૈયાર સંક્ષિપ્ત રિપોર્ટ.")
    st.markdown(
        f"""
        <div class="report-card">
            <strong>EduVision AI દ્વારા જનરેટ કરાયેલ શૈક્ષણિક રિપોર્ટ</strong>
            <div class="report-grid">
                <div class="report-pill"><strong>શાળા</strong><br>{SCHOOL_NAME}</div>
                <div class="report-pill"><strong>માર્ગદર્શક</strong><br>{MENTOR_NAME}</div>
                <div class="report-pill"><strong>વિદ્યાર્થી</strong><br>{student_name or "નામ દાખલ કરેલ નથી"}</div>
                <div class="report-pill"><strong>ધોરણ</strong><br>{standard}</div>
                <div class="report-pill"><strong>અનુમાનિત ગુણ</strong><br>{score}/20</div>
                <div class="report-pill"><strong>જોખમ સ્તર</strong><br>{risk["label"]}</div>
            </div>
            <p style="margin-top:1rem;margin-bottom:0;color:#334155;">{risk["tone"]}</p>
        </div>
        """,
        unsafe_allow_html=True,
    )


def main() -> None:
    inject_css()
    sidebar()
    hero()

    st.markdown("<br>", unsafe_allow_html=True)

    section_title("👤", "વિદ્યાર્થીની માહિતી", "વ્યક્તિગત રિપોર્ટ બનાવવા માટે મૂળભૂત માહિતી દાખલ કરો.")
    with st.container(border=False):
        col_1, col_2 = st.columns([1.3, 0.8])
        with col_1:
            student_name = st.text_input("વિદ્યાર્થીનું નામ", placeholder="ઉદાહરણ: આરવ પટેલ")
        with col_2:
            standard = st.selectbox("ધોરણ / Class", ["6", "7", "8"], index=2)

    section_title("📚", "શૈક્ષણિક માહિતી", "પરીક્ષા ગુણ, અભ્યાસ સમય અને હાજરી સંબંધિત વિગતો.")
    academic_col_1, academic_col_2, academic_col_3 = st.columns(3)
    with academic_col_1:
        g1 = st.slider("પહેલી પરીક્ષાના ગુણ (G1)", 0, 20, 10)
        studytime = st.select_slider(
            "દરરોજ શાળા પછી કેટલો સમય અભ્યાસ કરો છો?",
            options=[1, 2, 3, 4],
            value=2,
            format_func=lambda value: {
                1: "2 કલાકથી ઓછો",
                2: "2-5 કલાક",
                3: "5-10 કલાક",
                4: "10 કલાકથી વધુ",
            }[value],
        )
    with academic_col_2:
        g2 = st.slider("બીજી પરીક્ષાના ગુણ (G2)", 0, 20, 11)
        failures = st.slider("પહેલાં નાપાસ થયેલા વિષયોની સંખ્યા", 0, 4, 0)
    with academic_col_3:
        absences = st.slider("ગેરહાજરીના દિવસો", 0, 75, 5)
        st.markdown(
            f"""
            <div class="glass-card" style="padding:1rem;margin-top:1.7rem;">
                <strong>Academic Signal</strong><br>
                <span style="color:#475569;">G1 અને G2 મોડેલ માટે સૌથી મજબૂત સંકેતોમાં સામેલ છે.</span>
            </div>
            """,
            unsafe_allow_html=True,
        )

    section_title("💙", "જીવનશૈલી અને આરોગ્ય", "અભ્યાસ સાથે સંકળાયેલા દૈનિક વર્તનના પરિમાણો.")
    life_col_1, life_col_2, life_col_3 = st.columns(3)
    with life_col_1:
        health = st.slider("આરોગ્ય સ્તર", 1, 5, 3, help="1 = નબળું, 5 = ઉત્તમ")
    with life_col_2:
        freetime = st.slider("અભ્યાસ બાદ મળતો ફ્રી સમય", 1, 5, 3, help="1 = ખૂબ ઓછું, 5 = ખૂબ વધુ")
    with life_col_3:
        goout = st.slider("અભ્યાસ સિવાય મિત્રો અને મનોરંજન પ્રવૃત્તિઓમાં વિતાવેલો સમય", 1, 5, 3, help="1 = ખૂબ ઓછું, 5 = ખૂબ વધુ")

    section_title("🏫", "શૈક્ષણિક સહાય", "ઘર, શાળા અને ડિજિટલ સ્રોતોની ઉપલબ્ધતા.")
    support_col_1, support_col_2, support_col_3, support_col_4 = st.columns(4)
    with support_col_1:
        schoolsup = yes_no("શાળાની વધારાની સહાય")
    with support_col_2:
        famsup = yes_no("પરિવારની શૈક્ષણિક સહાય")
    with support_col_3:
        internet = yes_no("ઇન્ટરનેટ સુવિધા")
    with support_col_4:
        higher = yes_no("ઉચ્ચ અભ્યાસની ઇચ્છા")

    values = {
        "G1": g1,
        "G2": g2,
        "studytime": studytime,
        "failures": failures,
        "schoolsup": schoolsup,
        "famsup": famsup,
        "internet": internet,
        "higher": higher,
        "goout": goout,
        "freetime": freetime,
        "health": health,
        "absences": absences,
    }

    st.markdown("<br>", unsafe_allow_html=True)
    button_col_1, button_col_2, button_col_3 = st.columns([1, 1.15, 1])
    with button_col_2:
        predict_clicked = st.button("🔮 પરિણામ જાણો", type="primary")

    if predict_clicked:
        render_results(student_name, standard, values)
    else:
        st.markdown(
            """
            <div class="glass-card">
                <strong>તૈયાર છે.</strong>
                ઉપરની માહિતી દાખલ કર્યા પછી <strong>🔮 પરિણામ જાણો</strong> પર ક્લિક કરો.
                EduVision AI અનુમાનિત ગુણ, જોખમ સ્તર, progress meter અને વ્યક્તિગત ભલામણો બતાવશે.
            </div>
            """,
            unsafe_allow_html=True,
        )


if __name__ == "__main__":
    main()
