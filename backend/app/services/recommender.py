from typing import Dict, Any, List
from app.models.schemas import RecommendationItem

def generate_recommendations(values: Dict[str, Any], score: float) -> List[RecommendationItem]:
    recommendations: List[RecommendationItem] = []

    if values.get("studytime", 2) <= 1:
        recommendations.append(RecommendationItem(
            title="અભ્યાસનો સમય વધારો",
            detail="દરરોજ નક્કી કરેલા સમયપત્રક મુજબ વાંચન, પુનરાવર્તન અને પ્રશ્નોત્તરીનો અભ્યાસ કરવો.",
            category="study"
        ))
    elif values.get("studytime", 2) == 2:
        recommendations.append(RecommendationItem(
            title="અભ્યાસમાં નિયમિતતા જાળવો",
            detail="અભ્યાસનો સમય યોગ્ય છે, પરંતુ મુશ્કેલ વિષયો માટે અલગ સમય ફાળવવો.",
            category="study"
        ))

    if values.get("absences", 0) > 10:
        recommendations.append(RecommendationItem(
            title="હાજરીમાં સુધારો કરો",
            detail="વધુ ગેરહાજરીથી પાઠ્યક્રમની સમજ પર અસર થાય છે, તેથી નિયમિત હાજરી માટે ખાસ ધ્યાન આપવું.",
            category="attendance"
        ))

    if values.get("failures", 0) > 0:
        recommendations.append(RecommendationItem(
            title="નબળા વિષયો પર વિશેષ ધ્યાન આપો",
            detail="જે વિષયોમાં મુશ્કેલી હોય તે માટે શિક્ષકના માર્ગદર્શન હેઠળ સુધારાત્મક અભ્યાસ યોજના બનાવવી.",
            category="study"
        ))

    if values.get("health", 3) <= 2:
        recommendations.append(RecommendationItem(
            title="આરોગ્યનું ધ્યાન રાખો",
            detail="પૂરતી ઊંઘ, પૌષ્ટિક આહાર, પાણી અને ટૂંકા વિરામ અભ્યાસની અસરકારકતા વધારવામાં મદદરૂપ થાય છે.",
            category="health"
        ))

    if values.get("goout", 3) >= 4:
        recommendations.append(RecommendationItem(
            title="બહાર જવાની આવર્તન સંતુલિત રાખો",
            detail="મિત્રો સાથે સમય વિતાવવો જરૂરી છે, પરંતુ પરીક્ષા અને અભ્યાસ દરમિયાન સમયનું યોગ્ય સંચાલન કરવું.",
            category="lifestyle"
        ))

    if values.get("freetime", 3) >= 4 and score < 16:
        recommendations.append(RecommendationItem(
            title="ફ્રી સમયનો શૈક્ષણિક ઉપયોગ કરો",
            detail="ફ્રી સમયમાં નાના અભ્યાસ સત્રો, વાંચન અથવા પુનરાવર્તનનો સમાવેશ કરવો.",
            category="lifestyle"
        ))

    if values.get("schoolsup", "no") == "no" and score < 12:
        recommendations.append(RecommendationItem(
            title="શાળાની વધારાની સહાય મેળવો",
            detail="શિક્ષક, માર્ગદર્શક અથવા રિમેડિયલ વર્ગ દ્વારા જરૂરી શૈક્ષણિક આધાર મેળવવો.",
            category="support"
        ))

    if values.get("internet", "yes") == "no":
        recommendations.append(RecommendationItem(
            title="અભ્યાસ સામગ્રીની વ્યવસ્થા કરો",
            detail="ઇન્ટરનેટ ઉપલબ્ધ ન હોય તો શાળા લાઇબ્રેરી અથવા શિક્ષક પાસેથી ઑફલાઇન અભ્યાસ સામગ્રી મેળવવી.",
            category="support"
        ))

    if not recommendations:
        recommendations.append(RecommendationItem(
            title="સારી પ્રગતિ જાળવી રાખો",
            detail="વિદ્યાર્થીનું પ્રદર્શન ઉત્તમ છે. નિયમિત અભ્યાસ, હાજરી અને સ્વાસ્થ્ય જાળવી રાખી વધુ ઊંચા લક્ષ્યો સિદ્ધ કરો.",
            category="general"
        ))

    return recommendations[:6]
