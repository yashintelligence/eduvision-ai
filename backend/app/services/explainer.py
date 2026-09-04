from typing import Dict, Any, List
from app.models.schemas import FeatureFactor
from app.services.predictor import get_model

FEATURE_NAMES_GU = {
    "G2": "દ્વિતીય પરીક્ષાના ગુણ (G2)",
    "absences": "ગેરહાજરીના દિવસો",
    "G1": "પ્રથમ પરીક્ષાના ગુણ (G1)",
    "health": "આરોગ્ય સ્તર",
    "schoolsup": "શાળા શૈક્ષણિક સહાય",
    "studytime": "અભ્યાસનો દૈનિક સમય",
    "failures": "અગાઉ નાપાસ થયેલા વિષયો",
    "freetime": "નવરાશનો ફ્રી સમય",
    "goout": "મિત્રો સાથે બહાર જવાનો સમય",
    "internet": "ઇન્ટરનેટ સુવિધા",
    "higher": "ઉચ્ચ અભ્યાસની આકાંક્ષા",
    "famsup": "પરિવારની સહાય",
}

# Real feature importances extracted from trained GradientBoostingRegressor
MODEL_IMPORTANCES = {
    "G2": 80.53,
    "absences": 14.17,
    "G1": 1.64,
    "health": 0.78,
    "schoolsup": 1.12,
    "studytime": 0.52,
    "failures": 0.46,
    "freetime": 0.38,
    "goout": 0.35,
    "internet": 0.02,
    "higher": 0.02,
    "famsup": 0.01,
}

def get_model_feature_importances() -> List[Dict[str, Any]]:
    result = []
    for feat, imp in sorted(MODEL_IMPORTANCES.items(), key=lambda x: x[1], reverse=True):
        result.append({
            "feature": feat,
            "feature_name_gu": FEATURE_NAMES_GU.get(feat, feat),
            "importance_pct": imp,
        })
    return result

def explain_prediction(values: Dict[str, Any]) -> List[FeatureFactor]:
    factors: List[FeatureFactor] = []
    
    # 1. G2
    g2 = values.get("G2", 10)
    g2_imp = MODEL_IMPORTANCES["G2"]
    if g2 >= 14:
        factors.append(FeatureFactor(
            feature="G2",
            feature_name_gu=FEATURE_NAMES_GU["G2"],
            value=g2,
            importance_pct=g2_imp,
            status="strength",
            description_gu=f"દ્વિતીય પરીક્ષામાં ઉત્તમ ગુણ ({g2}/20) જે અંતિમ પરિણામ પર સૌથી વધુ ૮૦% હકારાત્મક પ્રભાવ પાડે છે."
        ))
    elif g2 >= 10:
        factors.append(FeatureFactor(
            feature="G2",
            feature_name_gu=FEATURE_NAMES_GU["G2"],
            value=g2,
            importance_pct=g2_imp,
            status="neutral",
            description_gu=f"દ્વિતીય પરીક્ષામાં સરેરાશ ગુણ ({g2}/20) – થોડા વધુ પ્રયત્નોથી સ્કોર વધી શકે છે."
        ))
    else:
        factors.append(FeatureFactor(
            feature="G2",
            feature_name_gu=FEATURE_NAMES_GU["G2"],
            value=g2,
            importance_pct=g2_imp,
            status="attention",
            description_gu=f"દ્વિતીય પરીક્ષામાં નીચા ગુણ ({g2}/20) – મોડેલ અનુસાર આ પરિબળ સ્કોર પર મુખ્ય નકારાત્મક અસર કરે છે."
        ))

    # 2. Absences
    absences = values.get("absences", 5)
    abs_imp = MODEL_IMPORTANCES["absences"]
    if absences <= 5:
        factors.append(FeatureFactor(
            feature="absences",
            feature_name_gu=FEATURE_NAMES_GU["absences"],
            value=absences,
            importance_pct=abs_imp,
            status="strength",
            description_gu=f"ખૂબ ઓછી ગેરહાજરી ({absences} દિવસ) – વર્ગખંડમાં નિયમિત હાજરીથી વિષય સમજણ મજબૂત બને છે (૧૪% મહત્વ)."
        ))
    elif absences <= 12:
        factors.append(FeatureFactor(
            feature="absences",
            feature_name_gu=FEATURE_NAMES_GU["absences"],
            value=absences,
            importance_pct=abs_imp,
            status="neutral",
            description_gu=f"સાધારણ ગેરહાજરી ({absences} દિવસ) – હાજરી વધુ નિયમિત બનાવવાની ભલામણ છે."
        ))
    else:
        factors.append(FeatureFactor(
            feature="absences",
            feature_name_gu=FEATURE_NAMES_GU["absences"],
            value=absences,
            importance_pct=abs_imp,
            status="attention",
            description_gu=f"વધુ ગેરહાજરી ({absences} દિવસ) – અભ્યાસક્રમના મહત્વના પ્રકરણો છૂટી જવાનું જોખમ ઊભું થાય છે."
        ))

    # 3. G1
    g1 = values.get("G1", 10)
    g1_imp = MODEL_IMPORTANCES["G1"]
    if g1 >= 14:
        factors.append(FeatureFactor(
            feature="G1",
            feature_name_gu=FEATURE_NAMES_GU["G1"],
            value=g1,
            importance_pct=g1_imp,
            status="strength",
            description_gu=f"પ્રથમ સત્રમાં ઉત્તમ પાયો ({g1}/20) જે સારો શૈક્ષણિક પાયો દર્શાવે છે."
        ))
    elif g1 < 10:
        factors.append(FeatureFactor(
            feature="G1",
            feature_name_gu=FEATURE_NAMES_GU["G1"],
            value=g1,
            importance_pct=g1_imp,
            status="attention",
            description_gu=f"પ્રથમ સત્રમાં ઓછા ગુણ ({g1}/20) – મૂળભૂત વિષયના સંકલ્પનાત્મક સુધારાની જરૂર છે."
        ))

    # 4. Studytime
    studytime = values.get("studytime", 2)
    study_map = {1: "< 2 કલાક", 2: "2-5 કલાક", 3: "5-10 કલાક", 4: "> 10 કલાક"}
    if studytime >= 3:
        factors.append(FeatureFactor(
            feature="studytime",
            feature_name_gu=FEATURE_NAMES_GU["studytime"],
            value=study_map.get(studytime, ""),
            importance_pct=MODEL_IMPORTANCES["studytime"],
            status="strength",
            description_gu=f"નિયમિત અભ્યાસ સમય ({study_map.get(studytime)}) જે પુનરાવર્તન અને સમજણ વધારે છે."
        ))
    elif studytime == 1:
        factors.append(FeatureFactor(
            feature="studytime",
            feature_name_gu=FEATURE_NAMES_GU["studytime"],
            value=study_map.get(studytime, ""),
            importance_pct=MODEL_IMPORTANCES["studytime"],
            status="attention",
            description_gu=f"ઓછો અભ્યાસ સમય ({study_map.get(studytime)}) – દૈનિક વાંચન વધારવું જરૂરી."
        ))

    # 5. Failures
    failures = values.get("failures", 0)
    if failures == 0:
        factors.append(FeatureFactor(
            feature="failures",
            feature_name_gu=FEATURE_NAMES_GU["failures"],
            value=0,
            importance_pct=MODEL_IMPORTANCES["failures"],
            status="strength",
            description_gu="શૂન્ય અગાઉની નિષ્ફળતા – શૈક્ષણિક પ્રવાહમાં સળંગ સ્થિરતા."
        ))
    else:
        factors.append(FeatureFactor(
            feature="failures",
            feature_name_gu=FEATURE_NAMES_GU["failures"],
            value=failures,
            importance_pct=MODEL_IMPORTANCES["failures"],
            status="attention",
            description_gu=f"{failures} વિષયમાં અગાઉ નાપાસ થયેલ – સુધારાત્મક કસોટીઓ જરૂરી."
        ))

    return factors
